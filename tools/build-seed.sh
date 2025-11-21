#!/bin/bash
set -e

echo ">> Convertendo seed.ts para seed.js..."
npx tsc apps/api/prisma/seed.ts --target ES2017 --module commonjs --outDir apps/api/dist/prisma

echo ">> seed.js gerado em apps/api/dist/prisma/seed.js"
