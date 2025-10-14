#!/bin/bash
git add .
git commit -m "auto: atualização automática"
git push origin $(git branch --show-current)
echo "✅ Código enviado com sucesso para a branch: $(git branch --show-current)"

