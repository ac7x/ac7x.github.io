# 框架適配倉儲規則中心 (Framework-Specific Prompt Repository)
這是一個專門為框架特定提示詞設計的規則中心，提供了多種框架的規則定義和最佳實踐。

## 功能特點

- 多種流行框架的規則集合
- 交互式 Web 面板顯示和搜尋規則
- 自動化文檔生成
- 持續集成和部署

## 支援框架

- Next.js
- Prisma
- TypeScript
- React Native
- Architecture

## 架構

本專案分為兩個主要部分：

1. **核心規則集**：位於 `core/rules/` 目錄下的 JSON 檔案
2. **Web 面板**：基於 Next.js 的 Web 應用程式，位於 `webpanel/` 目錄

## 在其他專案中使用規則集

我們的框架適配規則集可以用來規範 AI 代碼生成，並確保生成的代碼符合最佳實踐。以下是幾種整合方式：

### 1. 使用 GitHub Actions 自動檢查

最簡單的方式是通過 GitHub Actions 在每次 PR 或推送時自動檢查 AI 生成的代碼：

1. 在你的專案中創建文件 `.github/workflows/validate-ai-code.yml`：

```yaml
name: AI Code Validation

on:
  pull_request:
    branches: [ main, develop ]
  push:
    branches: [ main, develop ]
  workflow_dispatch:

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
      - name: Fetch Framework Rules
        run: |
          mkdir -p .framework-rules
          curl -s https://raw.githubusercontent.com/ac7x/ac7x.github.io/main/core/rules/architecture.json -o .framework-rules/architecture.json
          curl -s https://raw.githubusercontent.com/ac7x/ac7x.github.io/main/core/rules/client.json -o .framework-rules/client.json
          curl -s https://raw.githubusercontent.com/ac7x/ac7x.github.io/main/core/rules/prisma.json -o .framework-rules/prisma.json
          curl -s https://raw.githubusercontent.com/ac7x/ac7x.github.io/main/core/rules/security.json -o .framework-rules/security.json
          curl -s https://raw.githubusercontent.com/ac7x/ac7x.github.io/main/core/rules/server.json -o .framework-rules/server.json
      - name: Install Dependencies
        run: npm install glob minimatch
      - name: Run AI Code Validator
        run: node .github/scripts/validate-ai-code.js