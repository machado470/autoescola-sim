#!/usr/bin/env bash
# run-auto.sh — Sobe Postgres (Docker), aplica Prisma (generate/migrate/seed),
# inicia API (Nest) e Web (Vite) com logs e abre o navegador quando estiver pronto.

set -euo pipefail
cd "$(dirname "$0")/.."  # raiz do repo

APP_NAME="AutoEscola-Sim"
VITE_PORT="${VITE_PORT:-5173}"
API_URL="${API_URL:-http://localhost:3000/health}"
WEB_URL="http://localhost:${VITE_PORT}"
LOGS_DIR="logs"
API_LOG="${LOGS_DIR}/api.log"
WEB_LOG="${LOGS_DIR}/web.log"
POSTGRES_SVC="autoescola_postgres"
PGADMIN_SVC="autoescola_pgadmin"

# ── helpers ────────────────────────────────────────────────────────────────────
c() { printf "\033[%sm" "$1"; }
log() { printf "%s[%s]%s %s\n" "$(c '1;36')" "$APP_NAME" "$(c '0')" "$*"; }
ok()  { printf "%s[ok]%s  %s\n" "$(c '1;32')" "$(c '0')" "$*"; }
warn(){ printf "%s[!]%s  %s\n" "$(c '1;33')" "$(c '0')" "$*"; }
err() { printf "%s[x]%s  %s\n" "$(c '1;31')" "$(c '0')" "$*" >&2; }

have() { command -v "$1" >/dev/null 2>&1; }

wait_health() {
  local svc="$1" tries=60
  while ((tries--)); do
    if docker inspect --format='{{.State.Health.Status}}' "${svc}" 2>/dev/null | grep -q healthy; then
      return 0
    fi
    sleep 1
  done
  return 1
}

wait_http() {
  local url="$1" tries=120
  while ((tries--)); do
    if curl -sSf -o /dev/null "$url"; then return 0; fi
    sleep 1
  done
  return 1
}

port_in_use() {
  # usa ss (presente no WSL2). Retorna 0 se porta em uso.
  ss -ltn "( sport = :$1 )" | grep -q ":$1"
}

open_url() {
  local url="$1"
  if have wslview; then wslview "$url" >/dev/null 2>&1 || true
  elif have xdg-open; then xdg-open "$url" >/dev/null 2>&1 || true
  else
    warn "Abra manualmente: $url"
  fi
}

# ── logs ───────────────────────────────────────────────────────────────────────
mkdir -p "$LOGS_DIR"
: > "$API_LOG"
: > "$WEB_LOG"

log "Iniciando ambiente de dev…"
log "Criando/atualizando cliente Prisma"
pnpm -C apps/api prisma generate >/dev/null

log "Subindo containers Docker (Postgres + PgAdmin)…"
docker compose up -d

log "Aguardando Postgres ficar saudável…"
if wait_health "$POSTGRES_SVC"; then
  ok  "Postgres pronto."
else
  warn "Healthcheck não respondeu a tempo; seguindo assim mesmo."
fi

log "Aplicando migrations Prisma…"
pnpm -C apps/api prisma migrate deploy

log "Rodando seed (no-op se vazio)…"
if ! pnpm -C apps/api prisma db seed >/dev/null 2>&1; then
  warn "Seed retornou código != 0 — seguindo (seed não crítico)."
fi

# ── API ────────────────────────────────────────────────────────────────────────
log "Iniciando API (Nest) em background… (logs: $API_LOG)"
# mata dev anterior da API (se houver)
pkill -f "pnpm.*autoescola/api.*dev" >/dev/null 2>&1 || true
# inicia
nohup pnpm -C apps/api dev >>"$API_LOG" 2>&1 & disown

# ── WEB ────────────────────────────────────────────────────────────────────────
if port_in_use "$VITE_PORT"; then
  warn "Porta ${VITE_PORT} já em uso — NÃO vou iniciar outro Vite."
else
  log "Iniciando Web (Vite) em background… (logs: $WEB_LOG)"
  pkill -f "pnpm.*autoescola/web.*dev" >/dev/null 2>&1 || true
  nohup pnpm -C apps/web dev >>"$WEB_LOG" 2>&1 & disown
fi

log "Esperando Vite responder em ${WEB_URL}…"
if wait_http "$WEB_URL"; then
  ok  "Frontend pronto em ${WEB_URL}"
  open_url "$WEB_URL"
else
  warn "Vite não respondeu a tempo. Veja os logs: $WEB_LOG"
fi

# Dica final
echo
ok  "Tudo iniciado!"
echo "  • API health:  ${API_URL}"
echo "  • Web:         ${WEB_URL}"
echo "  • Logs API:    ${API_LOG}  (ex.: tail -f ${API_LOG})"
echo "  • Logs Web:    ${WEB_LOG}  (ex.: tail -f ${WEB_LOG})"
echo
