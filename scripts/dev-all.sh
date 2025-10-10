#!/usr/bin/env bash
pnpm --filter @aes/api dev &
pnpm --filter @aes/web dev &
wait
