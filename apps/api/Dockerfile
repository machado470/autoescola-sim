FROM node:20-bookworm-slim AS deps
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api/package.json apps/api/package.json

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm -C apps/api prisma generate || true
RUN pnpm -C apps/api build

# --- runtime ---
FROM node:20-bookworm-slim AS runner
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/api/dist ./apps/api/dist
COPY --from=deps /app/apps/api/package.json ./apps/api/package.json

# garante prisma client no runtime (caso schema mude)
RUN npx prisma generate || true

EXPOSE 3000
CMD ["node", "apps/api/dist/main.js"]
