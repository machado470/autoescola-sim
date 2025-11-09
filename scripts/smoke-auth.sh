#!/usr/bin/env bash
set -euo pipefail
API="${API:-http://localhost:3000}"
EMAIL="${AUTH_EMAIL:-demo@local.test}"
PASS="${AUTH_PASSWORD:-demo123}"

echo "== health =="
curl -s "$API/health" | jq

echo "== register (ignora 409) =="
REG=$(curl -s -o /tmp/register.json -w "%{http_code}" -X POST "$API/auth/register" -H "Content-Type: application/json" -d "$(jq -n --arg e "$EMAIL" --arg p "$PASS" "{email:\$e,password:\$p}")")
if [[ "$REG" != "200" && "$REG" != "409" ]]; then
  echo "⚠️  registro retornou código $REG — prosseguindo mesmo assim";
else
  echo "✅ registro OK ($REG)";
fi
