FROM node:20-bookworm-slim

WORKDIR /app

# libs necessárias
RUN apt-get update \
  && apt-get install -y openssl libssl3 \
  && rm -rf /var/lib/apt/lists/*

# habilita pnpm
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

# copia manifests do monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# copia package.json da API
COPY apps/api/package.json ./apps/api/package.json

# copia prisma, scripts e tsconfig (FUNDAMENTAL)
COPY apps/api/prisma ./apps/api/prisma
COPY apps/api/scripts ./apps/api/scripts
COPY apps/api/tsconfig.json ./apps/api/tsconfig.json

# instala dependências
RUN pnpm install --frozen-lockfile

# copia o restante do projeto

COPY apps/api ./apps/api

# gera prisma client usando o schema correto
RUN npx prisma generate --schema=apps/api/prisma/schema.prisma

# build da API
RUN pnpm --filter ./apps/api build

CMD ["node", "apps/api/dist/main.js"]

