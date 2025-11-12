# --- base com pnpm ---
FROM node:20-bookworm-slim AS base
ENV PNPM_HOME=/usr/local/bin
RUN apt-get update && apt-get install -y openssl libssl3 && \
    corepack enable && corepack prepare pnpm@9.12.3 --activate
WORKDIR /app

# --- deps ---
FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/api/prisma/ apps/api/prisma/
ENV PRISMA_SKIP_POSTINSTALL_GENERATE=true
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
    pnpm install --frozen-lockfile

# --- build ---
FROM base AS build
COPY . .
COPY --from=deps /app/node_modules /app/node_modules
RUN npx prisma generate --schema=apps/api/prisma/schema.prisma \
 && pnpm --filter ./apps/api build

# --- runtime ---
FROM node:20-bookworm-slim AS runtime
RUN apt-get update && apt-get install -y openssl libssl3
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/apps/api/dist /app/apps/api/dist
COPY --from=build /app/apps/api/prisma /app/apps/api/prisma
ENV PORT=3000
EXPOSE 3000
CMD ["node", "apps/api/dist/main.js"]
