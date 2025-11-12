#!/usr/bin/env bash
set -euo pipefail
jq --version >/dev/null 2>&1 || { echo "jq faltando"; exit 1; }

# token
export TOKEN="$(curl -sS http://localhost:3000/auth/login \
  -H 'Content-Type: application/json' \
  --data-raw '{"email":"admin@local","password":"admin"}' | jq -r '.access_token')"
echo "TOKEN ${#TOKEN} chars"

# públicas
echo "# health";           curl -sS http://localhost:3000/health | jq
echo "# quiz random";      curl -sS 'http://localhost:3000/quiz/random?take=3' | jq

# auth
echo "# whoami";           curl -sS http://localhost:3000/auth/whoami -H "Authorization: Bearer ${TOKEN}" | jq

# protegidas
echo "# schools GET";      curl -sS http://localhost:3000/schools -H "Authorization: Bearer ${TOKEN}" | jq
echo "# instructors GET";  curl -sS http://localhost:3000/instructors -H "Authorization: Bearer ${TOKEN}" | jq
echo "# simulator GET";    curl -sS http://localhost:3000/simulator -H "Authorization: Bearer ${TOKEN}" | jq
