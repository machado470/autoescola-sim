#!/usr/bin/env bash
set -euo pipefail
API="${API:-http://localhost:3000}"

echo "== health =="
curl -s "$API/health" | jq

echo -e "\n== 1 pergunta aleatória =="
curl -s "$API/quiz/random" \
| jq '.[0] | {id, categoryId, answers:(.answers|map({id,text,isCorrect}))}'

for id in 1 2 3; do
  echo -e "\n== 10 por categoria (\$id) =="
  curl -s "$API/quiz/random-by-category?categoryId=$id&n=10" \
  | jq '{count:length, sample:(.[0] | {id, categoryId, answers:(.answers|map({id,text,isCorrect}))})}'
done
