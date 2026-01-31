---
title: OpenClaw：一個 AI 實習生助手（Windows + VirtualBox + Ubuntu VM 安裝筆記）
date: "2026-02-01T00:30:00.000Z"
description: 在 Windows 上用 VirtualBox 建 Ubuntu VM，並用一鍵腳本把 OpenClaw 裝起來。
---

你可以把 **OpenClaw** 想像成「AI 實習生助手」：
它不只會聊天，也能在你的工作環境裡實際動手做事——跑指令、讀寫檔案、排程、抓資料、維護專案。

這篇文章會做兩件事：
1) 用白話解釋 OpenClaw 是什麼、適合誰
2) 在 **Windows 本機**用 **VirtualBox** 建立一台 **Ubuntu VM**，並在 VM 裡把 OpenClaw 跑起來

> 注意：以下流程不會要求你把任何 token/機密寫進文章或 repo。

---

## 1) OpenClaw 是什麼？

很多人對 AI 的第一印象是「聊天」，但只要你開始做專案，很快會想要：

- 幫我整理資料、產出報告
- 幫我寫/改 code、跑測試、修小 bug
- 幫我每天固定做例行事（備份、抓新聞、更新部署）
- 幫我在 Discord / Telegram / 其他 channel 裡接收指令並回覆

OpenClaw 的核心價值在於：

- **它是可以使用工具的 AI assistant**
  - 不是只給答案，而是能在你的環境裡「把事情做完」。
- **它有 state / workspace / skills 的概念**
  - 把可重複流程變成 skill（例如 `/news`），久了就像讓實習生熟悉你的 SOP。
- **它適合跑在一個獨立的 Linux 環境**
  - 例如 Ubuntu VM：安全、乾淨、跟 Windows 隔離，出問題也好復原。

---

## 2) 為什麼用 Ubuntu VM？

在 Windows 直接跑也不是不行，但 VM 有幾個實際優點：

- **隔離**：你的 bot、依賴、token、workspace 都在 VM 裡，不會把 Windows 搞亂。
- **可複製**：要換機、要重建，VM 一份就搞定。
- **更貼近部署環境**：很多服務（Node、Linux 工具）在 Ubuntu 上就是比較順。

---

## 3) 用 VirtualBox 建立 Ubuntu VM（建議規格）

### 3.1 先準備

- VirtualBox（Windows 版）
- Ubuntu Desktop ISO（新手推薦 Desktop，比較少坑；熟悉 Linux 才選 Server）

建議 VM 配置：
- CPU：2 cores 以上
- RAM：8GB（最低 4GB）
- Disk：60GB（最低 30GB）

### 3.2 VirtualBox 建 VM 的重點設定

1. New → Type 選 Linux / Ubuntu (64-bit)
2. Memory 設 4096MB 以上（建議 8192MB）
3. CPU 設 2 cores 以上
4. Disk 建 VDI（dynamically allocated）
5. 掛載 Ubuntu ISO → 開機安裝

（安裝完成後建議順手做）
- `sudo apt update && sudo apt upgrade -y`

---

## 4) 在 Ubuntu VM 裝 OpenClaw（推薦：一鍵腳本）

我把常見的安裝步驟包成一支腳本：

- 會裝：curl / git / build-essential
- 會裝：Node.js 22
- 會用 **~/.npm-global** 當 npm global prefix（避免 sudo npm）
- 會 `npm install -g openclaw`

### 4.1 下載/執行腳本

在 Ubuntu VM 裡：

```bash
# 進到你想放腳本的位置，例如家目錄
cd ~

# 你可以直接把下面內容另存成 setup-openclaw.sh
# 然後：
chmod +x setup-openclaw.sh
./setup-openclaw.sh
```

腳本內容（同 repo 版本）：

```bash
#!/usr/bin/env bash
set -euo pipefail

sudo apt update
sudo apt install -y curl git ca-certificates build-essential

if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo apt install -y nodejs
fi

mkdir -p "$HOME/.npm-global"
npm config set prefix "$HOME/.npm-global"

if ! grep -q 'NPM_GLOBAL' "$HOME/.bashrc" 2>/dev/null; then
  cat >> "$HOME/.bashrc" <<'RC'

# NPM_GLOBAL (OpenClaw)
export NPM_GLOBAL="$HOME/.npm-global"
export PATH="$NPM_GLOBAL/bin:$PATH"
RC
fi

export NPM_GLOBAL="$HOME/.npm-global"
export PATH="$NPM_GLOBAL/bin:$PATH"

npm install -g npm@latest
npm install -g openclaw

openclaw --version
```

---

## 5) 初始化 OpenClaw（第一次必做）

OpenClaw 裝好後，通常第一輪會做兩件事：

### 5.1 建立基本設定與 workspace

```bash
openclaw setup
```

### 5.2 互動式導覽（建議跑一次）

```bash
openclaw onboard
```

這會帶你設定：
- 使用哪個模型/供應商（例如 OpenAI / Gemini 等）
- 要接哪些 channel（例如 Discord）
- workspace 放哪裡、skills 怎麼管理

> 小提醒：Discord bot token 這種機密資料，建議只放在 VM 裡的設定檔/環境變數，不要 commit 到 repo。

---

## 6) 讓它像「實習生」一樣工作：排程 + skills

OpenClaw 的爽感通常來自兩件事：

- 把常用流程做成 skills（例如：抓新聞、整理摘要、維護網站）
- 用 cron/排程把例行事自動化（例如每天備份、每天抓資料）

當你把 SOP 固定下來，它就會越來越像「你帶出來的 AI 實習生」。

---

## 結語

如果你只需要聊天，任何 LLM 都能做到。
但如果你想要的是：

- 能在你環境裡實作
- 能幫你維護專案
- 能把流程自動化

那 OpenClaw 這種「工具型 AI 助手」就會非常適合。

下一篇我會把「如何把 OpenClaw 接到 Discord」寫成完整流程（含常見坑）。
