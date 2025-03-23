# ac7x.github.io

## 專案目錄結構
ac7x.github.io/
│
├── .github/
│   ├── workflows/
│   │   ├── ci-cd.yml              # CI/CD 主要工作流程
│   │   ├── build.yml              # 構建流程
│   │   └── deploy.yml             # 部署流程
│   │   ├── pages-deploy.yml       # GitHub Pages 部署工作流程
│   ├── docker-publish.yml         # Docker 鏡像發布工作流程
│   │   ├── build-image.yml        # 鏡像構建
│   │   └── push-image.yml         # 鏡像推送
│   │   ├── npm-audit.yml          # NPM 套件安全掃描
│   │   └── docker-scan.yml        # Docker 鏡像掃描
│   ├── codeql-analysis.yml        # 代碼質量分析
│   │   ├── typescript.yml         # TypeScript 代碼分析
│   │   └── security.yml           # 安全漏洞檢測
│   └── cleanup-artifacts.yml      # 清理過期構建產物
│   └── dependabot.yml             # Dependabot 配置文件
│   └── CONTRIBUTION_GUIDELINES.md # 貢獻指南
│
├── docker/
│   └── Dockerfile                 # 多階段構建的 Dockerfile
│
├── src/
│   ├── app/                       # Next.js App Router 目錄
│   │   ├── page.tsx               # 首頁
│   │   ├── dashboard/
│   │   │   └── page.tsx           # 儀表板頁面
│   │   ├── layout.tsx             # 根佈局
│   │   └── globals.css            # 全局樣式
│   ├── pages/                     # Next.js Pages Router 目錄
│   │   ├── index.tsx              # 首頁
│   │   ├── dashboard.tsx          # 儀表板頁面
│   │   └── _app.tsx               # 自定義 App 組件
│   ├── components/                # React 組件
│   │   ├── Header.tsx             # 頁面頂部組件
│   │   ├── Sidebar.tsx            # 側邊欄組件
│   │   ├── Chart.tsx              # 圖表組件
│   │   ├── dashboard/             # 儀表板相關組件
│   │   │   ├── UsageStats.tsx     # 使用統計組件
│   │   │   ├── PerformanceMonitor.tsx # 效能監控組件
│   │   │   ├── SystemManager.tsx  # 系統管理組件
│   │   │   └── NotificationCenter.tsx # 通知與報告組件
│   ├── styles/                    # 樣式文件
│   │   ├── globals.css            # 全局樣式
│   │   └── Home.module.css        # 首頁樣式
│   ├── utils/                     # 工具函數
│   │   ├── api.ts                 # API 請求工具
│   │   ├── constants.ts           # 常量定義
│   │   └── version.ts             # 版本管理工具
│   └── types/                     # TypeScript 類型定義
│       ├── index.ts               # 全局類型定義
│       └── dashboard.ts           # 儀表板相關類型
│
├── public/                        # 靜態資源目錄
│   ├── images/                    # 圖片資源
│   ├── fonts/                     # 字體資源
│   └── favicon.ico                # 網站圖標
│
├── scripts/
│   ├── build/
│   │   ├── index.ts               # 構建入口
│   │   ├── docker.ts              # Docker 構建
│   │   └── webpack.ts             # Webpack 構建
│   ├── deploy/
│   │   ├── index.ts               # 部署入口
│   │   ├── vercel.ts              # Vercel 部署
│   │   ├── gh-pages.ts            # GitHub Pages 部署
│   │   └── docker.ts              # Docker 部署
│   └── cleanup/
│       ├── index.ts               # 清理入口
│       ├── cache.ts               # 緩存清理
│       └── artifacts.ts           # 構建產物清理
│
├── config/
│   ├── next.config.js             # Next.js 配置文件
│   ├── vercel.json                # Vercel 配置文件
│   ├── node-config.json           # Node.js 配置文件
│   └── tsconfig.json              # TypeScript 配置文件
│
├── .dockerignore                  # Docker 忽略文件
├── .gitignore                     # Git 忽略文件
├── package.json                   # 專案依賴配置
├── pnpm-lock.yaml                 # pnpm 鎖定文件
└── README.md                      # 項目說明文件


## 專案概述
本專案旨在透過自動化的CI/CD流程來加速Node.js 20、TypeScript、React、Next.js、pnpm與Vercel的部署，並有效提升整體開發和部署效率。同時，專案支援GitHub Pages靜態網站托管，提供高效能且易於維護的Web應用程式開發環境。

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

2. **代碼檢查**
   - ESLint靜態分析
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
- Node.js 20 與 TypeScript 強類型支援
- React.js 與 Next.js (App Router) 前端框架
- pnpm 包管理與 Vercel 部署平台
- GitHub Actions 自動化工作流程
- Docker多階段構建優化
- 自動化依賴管理（Dependabot）
- GitHub Pages 靜態網站托管支援

## 核心功能
### CI/CD 自動化
- 自動化鏡像構建與推送
- 條件觸發的持續部署
- DockerHub整合
- GitHub Pages 自動部署

### 依賴管理
- Dependabot自動更新
- 版本一致性確保
- 自動化相依性檢查
- TypeScript、React和Next.js相關依賴管理

### 監控與維護
- 構建效能追踪
- 資源使用監控
- 自動化清理機制
- 前端應用載入速度與效能指標

### 儀表板功能
- **使用統計**: 鏡像使用次數統計、訪問量分析、構建時間分析
- **效能監控**: CI/CD流程監控、新舊鏡像效能對比、前端效能指標
- **系統管理**: 依賴包更新狀態、緩存效能分析、TypeScript類型檢查結果追踪
- **通知與報告**: 構建推送通知、前端構建與部署狀態通知

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