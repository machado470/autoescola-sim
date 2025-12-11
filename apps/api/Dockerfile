FROM node:20-bookworm-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y openssl libssl3 curl \
  && rm -rf /var/lib/apt/lists/*

RUN corepack enable \
  && corepack prepare pnpm@9.12.3 --activate \
  && pnpm --version

RUN npm config set fetch-retries 5 \
  && npm config set fetch-retry-factor 10 \
  && npm config set fetch-timeout 600000 \
  && npm config set fetch-retry-maxtimeout 120000

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./

# prisma correto:
COPY apps/api/prisma ./apps/api/prisma

# código da API
COPY apps/api ./apps/api

RUN pnpm install --frozen-lockfile

WORKDIR /app/apps/api

# prisma correto
RUN npx prisma generate --schema=prisma/schema.prisma

RUN pnpm run build

CMD ["node", "dist/main.js"]
