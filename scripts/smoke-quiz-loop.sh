#!/usr/bin/env bash
set -euo pipefail
runs="${1:-5}"
for i in $(seq "$runs"); do
  echo -e "\n---- RUN $i/$runs ----"
  scripts/smoke-quiz.sh | sed 's/\\n/\n/g'
done
