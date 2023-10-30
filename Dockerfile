FROM node:slim as base

FROM base AS deps
WORKDIR /app
COPY package.json .
RUN apt-get update -y && apt-get install -y openssl
COPY package-lock.json .
ENV NODE_ENV production
RUN npm ci
RUN npm i ts-node

FROM deps AS builder
WORKDIR /app
ENV NODE_ENV production
ENV DATABASE_URL="file:./dev.db"
COPY --from=deps /app/node_modules ./node_modules
COPY . .
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
COPY --from=builder --chown=http:http /app/prisma/migrations ./prisma/migrations
COPY --from=builder --chown=http:http /app/app.sh ./app.sh
RUN chmod +x /app/app.sh
# COPY --from=builder --chown=http:http /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder --chown=http:http /app/script.js ./script.js
COPY --from=builder --chown=http:http /app/public ./public
COPY --from=builder --chown=http:http /app/next.config.js ./
COPY --from=builder --chown=http:http /app/.next/standalone ./
COPY --from=builder --chown=http:http /app/.next/static ./.next/static
RUN ln -sf /data/.env.production ./.env.production
# USER http

EXPOSE 3000
ENV DATABASE_URL="file:/data/fixture.db"
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["./app.sh"]