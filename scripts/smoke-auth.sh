#!/usr/bin/env bash
set -e

API_URL="http://localhost:3000"

echo "== health =="
curl -s "$API_URL/health" | jq .

echo "== login =="

curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@autoescola.com","senha":"123456"}' | jq .
