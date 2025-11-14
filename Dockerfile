FROM node:20-bookworm-slim

# Diretório base da aplicação
WORKDIR /app

# Dependências do sistema + pnpm
RUN apt-get update && apt-get install -y openssl libssl3 \
  && rm -rf /var/lib/apt/lists/* \
  && corepack enable && corepack prepare pnpm@9.12.3 --activate

# Arquivos base do monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Package da API + Prisma schema
COPY apps/api/package.json apps/api/package.json
COPY apps/api/prisma apps/api/prisma

# Instala dependências de tudo (monorepo)
RUN pnpm install --frozen-lockfile

# Copia o resto do código
COPY . .

# Gera Prisma Client e builda a API
RUN npx prisma generate --schema=apps/api/prisma/schema.prisma \
  && pnpm --filter ./apps/api build

# Sobe a API apontando pro main.js da API
CMD ["node", "/app/apps/api/dist/main.js"]
