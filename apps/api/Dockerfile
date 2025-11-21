FROM node:20-bookworm-slim

WORKDIR /app

# libs básicas
RUN apt-get update && apt-get install -y openssl libssl3 && rm -rf /var/lib/apt/lists/*

# habilita pnpm
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

# copia manifests
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# copia API package.json
COPY apps/api/package.json ./apps/api/package.json

# instala dependências
RUN pnpm install --no-frozen-lockfile

# copia tudo
COPY . .

# gera prisma client apontando pro schema correto
RUN pnpm prisma generate --schema=apps/api/prisma/schema.prisma

# build da API
RUN pnpm --filter @autoescola/api build

CMD ["node", "apps/api/dist/main.js"]
