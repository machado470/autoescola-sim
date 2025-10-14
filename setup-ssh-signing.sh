#!/usr/bin/env bash
set -euo pipefail

EMAIL="${1:-${GIT_EMAIL:-}}"
KEY_FILE="${HOME}/.ssh/id_ed25519"
PUB_FILE="${KEY_FILE}.pub"

echo "==> Setup SSH signing para commits (Git + WSL)"
[ -z "${EMAIL}" ] && { echo "Uso: $0 seu-email@dominio.com"; exit 1; }

mkdir -p "${HOME}/.ssh"
chmod 700 "${HOME}/.ssh"

if [ -f "${KEY_FILE}" ] && [ -f "${PUB_FILE}" ]; then
  echo ">> Chave já existe em ${KEY_FILE}. Mantendo."
else
  echo ">> Gerando nova chave ed25519 (sem passphrase para simplicidade)"
  ssh-keygen -t ed25519 -C "${EMAIL}" -f "${KEY_FILE}" -N ""
fi

# Opcional: carregar no agent (útil se usar passphrase)
eval "$(ssh-agent -s)" >/dev/null 2>&1 || true
ssh-add "${KEY_FILE}" >/dev/null 2>&1 || true

echo ">> Configurando Git para assinar com SSH"
git config --global gpg.format ssh
git config --global user.signingkey "file:${PUB_FILE}"
git config --global commit.gpgsign true
git config --global tag.gpgsign true

echo "==> Pronto. Adicione a chave abaixo no GitHub como *Signing key*:"
echo "GitHub > Settings > SSH and GPG keys > New SSH key > Key type: Signing key"
echo "-----8<----- COLE A PARTIR DA LINHA ABAIXO -----8<-----"
cat "${PUB_FILE}"
echo "-----8<----- ATE AQUI -----8<-----"
