FROM node:20-bookworm-slim AS base

RUN apt-get update && apt-get install -y openssl libssl3 \
  && corepack enable && corepack prepare pnpm@9.12.3 --activate

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/api/prisma apps/api/prisma

RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store pnpm install --frozen-lockfile

FROM base AS build

COPY . .
COPY --from=base /app/node_modules /app/node_modules

RUN npx prisma generate --schema=apps/api/prisma/schema.prisma \
  && pnpm --filter ./apps/api build

FROM base AS runtime

COPY --from=build /app/apps/api/dist /app/apps/api/dist
COPY --from=build /app/apps/api/prisma /app/apps/api/prisma
COPY --from=build /app/node_modules /app/node_modules

WORKDIR /app

CMD ["node", "apps/api/dist/main.js"]
