#!/usr/bin/env bash
set -e

API_URL="http://localhost:3000/api"

echo ">> Limpando banco..."
curl -s -X POST "$API_URL/debug/reset" || true

echo ">> Criando categorias..."
curl -s -X POST "$API_URL/categories" -H "Content-Type: application/json" -d '{"name":"Sinalização"}'
curl -s -X POST "$API_URL/categories" -H "Content-Type: application/json" -d '{"name":"Regras de Circulação"}'
curl -s -X POST "$API_URL/categories" -H "Content-Type: application/json" -d '{"name":"Infrações"}'

echo ">> Criando perguntas base..."
curl -s -X POST "$API_URL/questions" -H "Content-Type: application/json" -d '{
  "statement":"O que significa a placa A-1 (Curva à direita)?",
  "respostaA":"Entrada proibida",
  "respostaB":"Curva acentuada à direita",
  "respostaC":"Pista escorregadia",
  "respostaD":"Conversão obrigatória",
  "correta":"B",
  "categoryId":1
}'

curl -s -X POST "$API_URL/questions" -H "Content-Type: application/json" -d '{
  "statement":"Qual a velocidade máxima urbana (sem sinalização)?",
  "respostaA":"30 km/h",
  "respostaB":"40 km/h",
  "respostaC":"50 km/h",
  "respostaD":"60 km/h",
  "correta":"C",
  "categoryId":2
}'

curl -s -X POST "$API_URL/questions" -H "Content-Type: application/json" -d '{
  "statement":"Placa R-1 significa:",
  "respostaA":"Pare obrigatório",
  "respostaB":"Dê preferência",
  "respostaC":"Fluxo invertido",
  "respostaD":"Siga em frente",
  "correta":"A",
  "categoryId":1
}'

echo ">> SEED FINALIZADO (SEM ERROS)!"
