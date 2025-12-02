FROM node:20-bookworm-slim

WORKDIR /app

# libs necessárias
RUN apt-get update \
  && apt-get install -y openssl libssl3 \
  && rm -rf /var/lib/apt/lists/*

# habilita pnpm
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

# 1) COPIA SOMENTE OS MANIFESTS DO MONOREPO
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.json ./tsconfig.json

# 2) COPIA OS MANIFESTS DA API (sem código ainda)
COPY apps/api/package.json ./apps/api/package.json
COPY apps/api/tsconfig.json ./apps/api/tsconfig.json
COPY apps/api/tsconfig.build.json ./apps/api/tsconfig.build.json

# 3) INSTALA AS DEPENDÊNCIAS
RUN pnpm install --frozen-lockfile

# 4) AGORA SIM — COPIA O CÓDIGO COMPLETO DA API
COPY apps/api ./apps/api

# 5) GERA O CLIENTE PRISMA (agora que o código está completo)
RUN npx prisma generate --schema=apps/api/prisma/schema.prisma

# 6) BUILD DA API
WORKDIR /app/apps/api
RUN pnpm build

# 7) COMANDO FINAL
CMD ["node", "dist/main.js"]
