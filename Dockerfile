FROM node:slim as base

FROM base AS deps
WORKDIR /app
COPY package.json .
RUN apt-get update -y && apt-get install -y openssl
COPY package-lock.json .
ENV NODE_ENV production
RUN npm i sharp
RUN npm i ts-node
RUN npm ci

FROM deps AS builder
WORKDIR /app
ENV NODE_ENV production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN rm -frv prisma/migrations
RUN rm -fv prisma/dev.db
RUN rm -fv prisma/dev.db-journal
RUN npx prisma migrate dev --name init --create-only
RUN npx prisma generate
RUN npx ts-node script.ts
RUN npm run build && npm prune --production

FROM base AS runner
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl
ENV NODE_ENV production
RUN adduser --system --group http
RUN mkdir .next
RUN chown http:http .next
VOLUME /db

COPY --from=builder --chown=http:http /app/prisma ./prisma
COPY --from=builder --chown=http:http /app/public ./public
COPY --from=builder--chown=http:http /app/next.config.js ./
COPY --from=builder --chown=http:http /app/.next/standalone ./
COPY --from=builder --chown=http:http /app/.next/static ./.next/static

USER http

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
CMD ["node", "server.js"]