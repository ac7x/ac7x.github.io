# 開發指南

本文檔提供了專案開發的詳細指南和最佳實踐。

## 開發環境設置

### 必要軟體
- Node.js 18+
- pnpm 8+
- Git
- Visual Studio Code (推薦)

### 推薦的VSCode插件
- ESLint
- Prettier
- TypeScript Vue Plugin
- Docker

### 環境設置步驟

1. 克隆專案:
   ```bash
   git clone https://github.com/ac7x/ac7x.github.io.git
   cd ac7x.github.io
   ```

2. 安裝依賴:
   ```bash
   pnpm install
   ```

3. 啟動開發伺服器:
   ```bash
   pnpm dev
   ```

## 代碼風格指南

### JavaScript/TypeScript
- 使用ES6+語法
- 優先使用`const`，其次是`let`，避免使用`var`
- 使用異步/等待模式而非回調
- 函數命名使用駝峰式命名法(camelCase)
- 組件命名使用帕斯卡命名法(PascalCase)

### CSS/樣式
- 使用CSS模組或Tailwind CSS
- 使用語義化命名
- 使用相對單位(rem, em, %)而非固定單位(px)

### 組件開發
- 遵循單一責任原則
- 將可重用邏輯提取到hooks或工具函數
- 優先使用函數組件和React hooks

## 測試指南

### 單元測試
- 每個功能模塊都應有對應的單元測試
- 使用Jest作為測試框架
- 運行測試: `pnpm test`

### 端到端測試
- 主要流程應有端到端測試
- 使用Cypress進行端到端測試
- 運行端到端測試: `pnpm test:e2e`

## 版本控制

### 分支策略
- `main`: 穩定版本，只接受通過審核的PR
- `develop`: 開發版本，功能完成後合併到此
- 功能分支: 從`develop`分出，命名為`feature/功能名稱`
- 修復分支: 從`main`分出，命名為`hotfix/問題描述`

### 提交訊息
請遵循[貢獻規範](CONTRIBUTION_GUIDELINES.md)中的提交訊息格式。

## 效能優化

- 使用React.memo減少不必要的重渲染
- 優化圖片使用next/image組件
- 使用動態導入延遲加載大型組件
- 確保生產構建經過適當壓縮

## 安全最佳實踐

- 不要在客戶端存儲敏感信息
- 使用環境變數存儲API密鑰
- 實施適當的內容安全策略
- 定期更新依賴以修補安全漏洞
