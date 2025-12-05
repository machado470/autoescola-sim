FROM node:20-bookworm-slim

WORKDIR /app

# libs necessárias
RUN apt-get update \
  && apt-get install -y openssl libssl3 curl \
  && rm -rf /var/lib/apt/lists/*

# habilita pnpm
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

# 1) COPIA SOMENTE OS MANIFESTS DO MONOREPO
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.json ./tsconfig.json

# 2) COPIA MANIFESTS DA API
COPY apps/api/package.json ./apps/api/package.json
COPY apps/api/tsconfig.json ./apps/api/tsconfig.json
COPY apps/api/tsconfig.build.json ./apps/api/tsconfig.build.json

# 3) INSTALA DEPENDÊNCIAS
RUN pnpm install --frozen-lockfile

# 4) COPIA O CÓDIGO COMPLETO
COPY apps/api ./apps/api

# 5) GERA O CLIENTE PRISMA
RUN npx prisma generate --schema=/app/apps/api/prisma/schema.prisma

# 6) BUILD
WORKDIR /app/apps/api
RUN pnpm build

# 7) DEFINE A PORTA CORRETA PARA DENTRO DO CONTAINER
ENV PORT=3001
EXPOSE 3001

# 8) INICIA A API
CMD ["node", "dist/main.js"]
