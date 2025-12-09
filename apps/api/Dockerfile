FROM node:20-bookworm-slim

WORKDIR /app

# Dependências básicas
RUN apt-get update \
  && apt-get install -y openssl libssl3 curl \
  && rm -rf /var/lib/apt/lists/*

# pnpm
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

# Copia arquivos principais do monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./

# Copia Prisma antes de tudo
COPY apps/api/prisma ./apps/api/prisma

# Copia o restante da API
COPY apps/api ./apps/api

# Instala dependências
RUN pnpm install --frozen-lockfile

# Gera Prisma Client
WORKDIR /app/apps/api
RUN npx prisma generate --schema=prisma/schema.prisma

# Build da API
RUN pnpm build

# Porta da API NestJS
EXPOSE 3000

# Agora WORKDIR correto para rodar o dist
CMD ["node", "dist/main.js"]
