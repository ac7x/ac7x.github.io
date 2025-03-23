# 如何貢獻

感謝您對 AC7X 專案的關注！我們歡迎各種形式的貢獻，包括但不限於功能開發、錯誤修復、文檔改進、測試和反饋。本指南將幫助您了解如何參與專案開發。

## 開始之前

請先閱讀以下文檔：

- [行為準則](./CODE_OF_CONDUCT.md)
- [貢獻規範](./CONTRIBUTION_GUIDELINES.md)
- [專案架構](./ARCHITECTURE.md)

## 貢獻流程

### 1. 尋找任務

- 查看 [Issues](https://github.com/ac7x/ac7x.github.io/issues) 頁面尋找標記為 "good first issue" 或 "help wanted" 的問題
- 或者，您可以提交新的 Issue 描述您發現的問題或建議的改進

### 2. 討論方案

在開始工作之前，請在相關 Issue 下留言，說明您計劃如何解決問題。這有助於：

- 避免重複工作
- 獲得社區和維護者的早期反饋
- 確保您的方案與專案方向一致

### 3. 開發流程

1. Fork 專案到您的 GitHub 帳戶
2. 克隆您的 Fork 到本地
   ```bash
   git clone https://github.com/您的用戶名/ac7x.github.io.git
   cd ac7x.github.io
   ```
3. 創建新分支（參見 [貢獻規範](./CONTRIBUTION_GUIDELINES.md) 中的分支命名規則）
   ```bash
   git checkout -b feature/您的功能名稱
   ```
4. 安裝依賴
   ```bash
   pnpm install
   ```
5. 進行開發
6. 確保代碼通過測試和 lint
   ```bash
   pnpm test
   pnpm lint
   ```
7. 提交您的變更（遵循 [提交規範](./CONTRIBUTION_GUIDELINES.md#提交規範)）
   ```bash
   git add .
   git commit -m "✨ 添加新功能：XXX"
   ```
8. 推送到您的 Fork
   ```bash
   git push origin feature/您的功能名稱
   ```
9. 創建 Pull Request

### 4. Pull Request 流程

1. 填寫完整的 PR 描述，說明您的變更解決了什麼問題、如何解決的
2. 連接相關的 Issue（例如："Closes #123"）
3. 確保自動化檢查通過
4. 等待審核並根據反饋進行修改

## 開發環境設置

詳見 [README.md](../README.md) 中的「快速開始」章節和 [開發指南](./DEVELOPMENT_GUIDELINES.md)。

## 報告錯誤

如果您發現了錯誤，請創建一個 Issue 並提供以下信息：

- 錯誤的簡短描述
- 重現步驟
- 預期行為與實際行為
- 環境信息（瀏覽器版本、操作系統等）
- 如果適用，添加截圖或錯誤日誌

## 提出功能請求

對於功能請求，請創建一個 Issue 並提供：

- 功能的簡短描述
- 該功能解決的問題或帶來的價值
- 可能的實現方式（如果您有想法）
- 相關的例子或參考（如果有）

## 聯絡方式

如果您有其他問題，可以通過以下方式聯繫我們：

- 創建一個 [Discussion](https://github.com/ac7x/ac7x.github.io/discussions)
- 發送電子郵件至 [project-email@example.com]

感謝您的貢獻！
