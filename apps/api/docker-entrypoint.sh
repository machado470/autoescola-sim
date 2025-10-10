#!/bin/sh
set -euo pipefail

if [ -f "./prisma/schema.prisma" ]; then
  echo "Applying database migrations..."
  npx prisma migrate deploy
fi

exec "$@"
