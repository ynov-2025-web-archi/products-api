FROM node:18-bullseye AS base

FROM base AS deps
RUN apt-get update && apt-get install -y openssl ca-certificates libssl1.1
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/src ./src
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

USER node

EXPOSE 3030

ENV PORT=3030

CMD ["node", "src/server.js"]