FROM node:lts-slim AS base

FROM base AS deps
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl
COPY package.json .
COPY package-lock.json .
RUN npm ci

FROM deps AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
ENV NODE_ENV production
COPY . .
ENV DATABASE_URL="file:./dev.db"
RUN npx prisma generate
RUN npm run build

FROM base AS runner
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl sudo
ENV NODE_ENV production
RUN adduser --system --group http
RUN mkdir .next
RUN chown http:http .next
RUN mkdir ./prisma
RUN npm i sharp
RUN npm i prisma

COPY --from=builder --chown=http:http /app/prisma/schema.prisma ./prisma/schema.prisma
COPY --from=builder --chown=http:http /app/script.js ./script.js
COPY --from=builder --chown=http:http /app/public ./public
COPY --from=builder --chown=http:http /app/next.config.js ./
COPY --from=builder --chown=http:http /app/.next/standalone ./
COPY --from=builder --chown=http:http /app/.next/static ./.next/static
RUN ln -sf /data/.env.production ./.env.production

USER http
EXPOSE 3000
ENV DATABASE_URL="file:/data/fixture.db"
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]