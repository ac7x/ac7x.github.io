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

## 架構

本專案分為兩個主要部分：

1. **核心規則集**：位於 `core/rules/` 目錄下的 JSON 檔案
2. **Web 面板**：基於 Next.js 的 Web 應用程式，位於 `webpanel/` 目錄

## 開發與部署

本專案使用 GitHub Actions 自動部署到 GitHub Pages。當推送到 main 分支時，會自動構建並部署。

### 開發環境設定

```bash
# 安裝依賴
cd webpanel
npm install

# 啟動開發伺服器
npm run dev
```

### 新增規則

在 `core/rules/` 目錄下新增或修改對應框架的 JSON 文件即可。

## 訪問網站

[https://ac7x.github.io/](https://ac7x.github.io/)
