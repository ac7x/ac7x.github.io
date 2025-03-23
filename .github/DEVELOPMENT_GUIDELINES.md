# 開發指南

本文檔提供 AC7X 專案的開發流程和規範，以確保程式碼品質和一致性。

## 開發環境設置

### 必要條件

- Node.js (>= 16.x)
- pnpm (>= 7.x)
- Git
- VSCode (推薦)

### 環境設置步驟

1. 克隆專案

```bash
git clone https://github.com/ac7x/ac7x.github.io.git
cd ac7x.github.io
```

2. 安裝依賴

```bash
pnpm install
```

3. 設置環境變數

```bash
cp .env.example .env.local
```

4. 啟動開發伺服器

```bash
pnpm dev
```

## 程式碼風格與規範

### 一般原則

- 使用 TypeScript 進行開發
- 遵循 DRY (Don't Repeat Yourself) 原則
- 模組化設計，保持單一職責
- 優先使用函數式組件
- 正確處理異步操作
- 寫清晰的註解和文檔

### 命名規範

- **檔案命名**
  - React 組件: PascalCase (例: `Button.tsx`)
  - 工具函數: camelCase (例: `formatDate.ts`)
  - 樣式文件: 與組件同名 (例: `Button.styles.ts`)

- **變數/函數命名**
  - 變數和函數: camelCase
  - 常量: UPPER_SNAKE_CASE
  - 類和類型: PascalCase
  - 布林變數: 使用 `is`, `has`, `should` 等前綴

### 目錄結構

```
src/
  ├── components/       # UI 組件
  │   ├── common/       # 通用組件
  │   ├── layout/       # 布局組件
  │   └── [feature]/    # 按功能分組的組件
  ├── hooks/            # 自定義 React hooks
  ├── pages/            # 頁面組件和路由
  ├── lib/              # 工具函數和業務邏輯
  ├── styles/           # 全局樣式和主題
  └── types/            # TypeScript 類型定義
```

## 開發工作流程

### 分支策略

- `main`: 主分支，只接受經審核的 PR
- `feature/*`: 新功能分支
- `fix/*`: 錯誤修復分支
- `docs/*`: 文檔更新分支

### 開發流程

1. 從最新的 `main` 分支創建功能分支
2. 在本地開發功能
3. 提交代碼 (遵循 [提交規範](./CONTRIBUTION_GUIDELINES.md#提交規範))
4. 推送分支到遠程
5. 創建 Pull Request
6. 等待審核並處理回饋
7. 合併到 `main` 分支

### Pull Request 要求

- 清晰描述變更內容和目的
- 關聯相關 Issue
- 包含必要的測試
- 通過所有自動化檢查
- 獲得至少一位維護者的批准

## 測試規範

### 測試策略

- 單元測試: 測試單個函數和組件
- 集成測試: 測試組件間的交互
- 端到端測試: 測試完整的用戶流程

### 測試目錄結構

```
src/
  └── components/
      └── Button/
          ├── Button.tsx
          ├── Button.styles.ts
          └── __tests__/
              ├── Button.test.tsx      # 單元測試
              └── Button.e2e.test.ts   # 端到端測試
```

### 測試規範

- 每個組件和工具函數應有對應的單元測試
- 測試應涵蓋主要功能點和邊緣情況
- 使用 Jest 作為測試框架
- 使用 React Testing Library 測試組件
- 使用 Cypress 進行端到端測試

## 性能優化

### 基本原則

- 使用 React.memo 避免不必要的重渲染
- 優化大型列表渲染 (虛擬列表)
- 懶加載組件和圖片
- 優化 bundle 大小
- 實施代碼分割

### 性能監控

- 使用 Lighthouse 評估性能
- 監控關鍵指標 (FCP, LCP, TTI, CLS)
- 使用 React Profiler 識別瓶頸

## 工具和配置

- **Linting**: ESLint 與自定義規則
- **Formatting**: Prettier
- **提交檢查**: Husky + lint-staged
- **依賴管理**: pnpm
- **CI/CD**: GitHub Actions

## 推薦的 VSCode 擴展

- ESLint
- Prettier
- TypeScript Vue Plugin
- vscode-styled-components
- GitLens
- Jest Runner
- Import Cost
