# ac7x.github.io

## 專案目錄結構
ac7x.github.io/
│
├── .github/
│   ├── workflows/
│   │   ├── ci-cd.yml              # CI/CD 主要工作流程
│   │   ├── docker-publish.yml     # Docker 鏡像發布工作流程
│   │   ├── dependency-review.yml  # 依賴項安全審查
│   │   ├── codeql-analysis.yml   # 代碼質量分析
│   │   └── cleanup-artifacts.yml  # 清理過期構建產物
│   └── dependabot.yml             # Dependabot 配置文件
│
├── docker/
│   ├── Dockerfile                 # 多階段構建的 Dockerfile
│   └── docker-compose.yml         # Docker Compose 文件（如果需要本地測試）
│
├── src/
│   └── tests/                 # 測試文件
│       └── ...                # 測試相關文件
│
├── scripts/
│   ├── build.ts               # 構建腳本
│   ├── deploy.ts              # 部署腳本
│   └── cleanup.ts             # 清理過期資源的腳本
│
├── config/
│   ├── vercel.json            # Vercel 配置文件
│   └── node-config.json       # Node.js 配置文件
│
├── docs/
│   ├── README.md              # 專案說明文件
│   └── architecture.md        # 技術架構說明
│
├── .dockerignore              # Docker 忽略文件
├── .gitignore                 # Git 忽略文件
├── package.json               # Node.js 專案配置文件
├── pnpm-lock.yaml             # pnpm 鎖定文件
├── LICENSE                    # 專案授權文件
└── .env                       # 環境變數文件

## 專案概述
本專案專注於透過自動化CI/CD流程來加速Node.js 20、pnpm與Vercel的部署流程，提升開發效率。

## GitHub Actions 工作流程
### 自動化部署流程
```yaml
name: CI/CD Pipeline
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
```

### 主要工作流程階段
1. **依賴安裝與緩存**
   - pnpm依賴安裝
   - node_modules緩存優化
   - Docker層級緩存

2. **代碼檢查與測試**
   - ESLint靜態分析
   - Jest單元測試
   - TypeScript類型檢查

3. **Docker構建與發布**
   - 多階段構建優化
   - 自動標籤管理
   - DockerHub推送

4. **Vercel部署**
   - 預覽環境部署
   - 生產環境發布
   - 部署狀態檢查

## TypeScript腳本使用
### 構建腳本 (build.ts)
```typescript
yarn build        # 執行產品構建
yarn build:dev    # 開發環境構建
yarn build:prod   # 生產環境構建
```

### 部署腳本 (deploy.ts)
```typescript
yarn deploy        # 部署到Vercel
yarn deploy:stage  # 部署到預覽環境
```

### 清理腳本 (cleanup.ts)
```typescript
yarn cleanup        # 清理構建緩存
yarn cleanup:all    # 完整清理
```

## 技術特點
- Node.js 20 + pnpm + Vercel 技術棧
- GitHub Actions 自動化工作流程
- Docker多階段構建優化
- 自動化依賴管理（Dependabot）

## 核心功能
### CI/CD 自動化
- 自動化鏡像構建與推送
- 條件觸發的持續部署
- DockerHub整合

### 依賴管理
- Dependabot自動更新
- 版本一致性確保
- 自動化相依性檢查

### 監控與維護
- 構建效能追踪
- 資源使用監控
- 自動化清理機制

## 快速開始
1. 克隆專案:
```bash
git clone https://github.com/yourusername/ac7x.github.io.git
```

2. 安裝依賴:
```bash
pnpm install
```

3. 啟動開發環境:
```bash
pnpm dev
```

## 文件參考
- [貢獻指南](./CONTRIBUTION_GUIDELINES.md)
- [技術架構](../docs/architecture.md)
- [授權說明](../LICENSE)