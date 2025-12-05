FROM node:20-bookworm-slim

WORKDIR /app

# libs necessárias
RUN apt-get update \
  && apt-get install -y openssl libssl3 curl \
  && rm -rf /var/lib/apt/lists/*

# habilita pnpm
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

# COPIA SOMENTE MANIFESTS (monorepo + api)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.json ./tsconfig.json
COPY apps/api/package.json ./apps/api/package.json
COPY apps/api/tsconfig.json ./apps/api/tsconfig.json
COPY apps/api/tsconfig.build.json ./apps/api/tsconfig.build.json

# INSTALA DEPENDÊNCIAS COMFORÇANDO PRISMA CLIENT NOVO
RUN pnpm install --frozen-lockfile

# COPIA O CÓDIGO DEPOIS DA INSTALAÇÃO
COPY apps/api ./apps/api

# GERA PRISMA CLIENT COM SCHEMA ATUALIZADO
RUN npx prisma generate --schema=/app/apps/api/prisma/schema.prisma

# BUILD
WORKDIR /app/apps/api
RUN pnpm build

ENV PORT=3001
EXPOSE 3001

CMD ["node", "dist/main.js"]
