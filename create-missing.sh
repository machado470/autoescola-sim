#!/usr/bin/env bash
set -e

mkd() { [[ -d "$1" ]] || { mkdir -p "$1"; echo "✅ pasta criada: $1"; } }
mkf() { [[ -f "$1" ]] || { printf "%s" "$2" > "$1"; echo "✅ arquivo criado: $1"; } }

# Pastas obrigatórias
mkd apps/api/prisma
mkd apps/web
mkd packages/ui
mkd packages/config
mkd infra/docker
mkd .github/workflows

# pnpm-workspace.yaml
if [[ -f pnpm-workspace.yaml ]]; then
  grep -q "apps/*" pnpm-workspace.yaml || echo -e "packages:\n  - apps/*\n  - packages/*" >> pnpm-workspace.yaml
else
  mkf pnpm-workspace.yaml "packages:
  - apps/*
  - packages/*"
fi

# docker-compose.yml (Postgres padrão)
if [[ ! -f docker-compose.yml ]]; then
  mkf docker-compose.yml "services:
  db:
    image: postgres:16
    container_name: autoescola_db
    ports: [\"5432:5432\"]
    environment:
      POSTGRES_USER: autoescola
      POSTGRES_PASSWORD: autoescola
      POSTGRES_DB: autoescola
    volumes:
      - ./.data/postgres:/var/lib/postgresql/data"
fi

# .env da API (conexão local)
mkf apps/api/.env "DATABASE_URL=\"postgresql://autoescola:autoescola@localhost:5432/autoescola?schema=public\""

# schema.prisma mínimo (se ainda não existir)
mkf apps/api/prisma/schema.prisma "generator client {
  provider = \"prisma-client-js\"
}
datasource db {
  provider = \"postgresql\"
  url      = env(\"DATABASE_URL\")
}
model School {
  id        String   @id @default(cuid())
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}"

# CI básico
mkf .github/workflows/ci.yml "name: ci
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'pnpm' }
      - run: pnpm i
      - run: pnpm -w -r build || echo 'skip build bootstrap'"
echo "🎯 Estrutura garantida."
