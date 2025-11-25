FROM node:20-bookworm-slim

WORKDIR /app

# libs necessárias
RUN apt-get update && apt-get install -y openssl libssl3 && rm -rf /var/lib/apt/lists/*

# habilita pnpm
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

# copia manifests do monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/package.json

# instala dependências
RUN pnpm install --frozen-lockfile

# copia código inteiro
COPY . .

# gera prisma client com o schema correto
RUN pnpm prisma generate --schema=apps/api/prisma/schema.prisma

# build da API
RUN pnpm --filter @autoescola/api build

CMD ["node", "apps/api/dist/main.js"]

