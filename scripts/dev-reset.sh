#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

pkill -f "ts-node-dev|vite|node" 2>/dev/null || true
rm -rf /tmp/ts-node-dev* apps/api/dist apps/web/dist

pnpm install
pnpm --filter @autoescola/api exec prisma generate

echo "✅ Reset feito. Agora rode:"
echo "  [api] pnpm --filter @autoescola/api dev"
echo "  [web] pnpm --filter @autoescola/web dev"
