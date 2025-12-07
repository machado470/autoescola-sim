FROM node:20-bookworm-slim

WORKDIR /app

# Dependências básicas
RUN apt-get update \
  && apt-get install -y openssl libssl3 curl \
  && rm -rf /var/lib/apt/lists/*

# pnpm
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

# Copia arquivos do monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./

# Copia API inteira
COPY apps/api ./apps/api

# Instala dependências do monorepo
RUN pnpm install --frozen-lockfile

# Gera PRISMA CLIENT com o SCHEMA correto
WORKDIR /app/apps/api
RUN npx prisma generate --schema=prisma/schema.prisma

# Build da API
RUN pnpm build

EXPOSE 3001

CMD ["node", "dist/main.js"]
