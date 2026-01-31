#!/usr/bin/env bash
set -euo pipefail

# One-shot installer for OpenClaw on Ubuntu (inside a VM)
# Safe defaults:
# - installs Node.js 22 from NodeSource
# - installs openclaw via npm (global) under ~/.npm-global (no sudo npm)
# - does NOT write any secrets; interactive onboarding is left to the user

echo "[1/6] apt deps"
sudo apt update
sudo apt install -y curl git ca-certificates build-essential

echo "[2/6] Node.js 22"
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo apt install -y nodejs
fi

node -v
npm -v

echo "[3/6] Configure npm global prefix (no sudo)"
mkdir -p "$HOME/.npm-global"
npm config set prefix "$HOME/.npm-global"

# Ensure PATH is set for current shell + future shells
if ! grep -q 'NPM_GLOBAL' "$HOME/.bashrc" 2>/dev/null; then
  cat >> "$HOME/.bashrc" <<'RC'

# NPM_GLOBAL (OpenClaw)
export NPM_GLOBAL="$HOME/.npm-global"
export PATH="$NPM_GLOBAL/bin:$PATH"
RC
fi
export NPM_GLOBAL="$HOME/.npm-global"
export PATH="$NPM_GLOBAL/bin:$PATH"

echo "[4/6] Install OpenClaw"
# Upgrade npm itself first (optional but reduces weird install issues)
npm install -g npm@latest
npm install -g openclaw

echo "[5/6] Verify"
openclaw --version

echo "[6/6] Next steps"
cat <<'NEXT'
OpenClaw is installed.

Recommended next commands:
  openclaw setup
  openclaw onboard

- `setup` initializes config/state/workspace.
- `onboard` walks you through providers + channels.

Tip: if you want Discord, prepare a Discord bot token before onboarding.
NEXT
