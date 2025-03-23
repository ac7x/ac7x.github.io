# 專案概述
這個專案旨在透過自動化的CI/CD流程來加速Node.js 20、TypeScript、React、Next.js、pnpm與Vercel的部署，並有效提升整體開發和部署效率。同時，專案支援GitHub Pages靜態網站托管，提供高效能且易於維護的Web應用程式開發環境。

## 技術架構
- 前端框架：React.js與Next.js (App Router)
- 程式語言：TypeScript提供強類型支援
- 使用GitHub Actions觸發DockerHub上的條件性發布
- 預先緩存技術栈的Docker鏡像
- 支援Node.js 20、pnpm和Vercel
- 採用多階段構建Dockerfile
- 支援GitHub Pages靜態網站托管

## 主要功能與工作流程

### 1. 鏡像構建與推送
- 觸發條件：代碼更新或特定條件達成
- 使用DockerHub API推送鏡像
- 確保鏡像標記和版本管理的一致性

### 2. 依賴包更新與管理
- 透過Dependabot自動檢測更新
- 自動處理鏡像版本更新
- 確保最新依賴包的整合
- 管理TypeScript、React和Next.js相關依賴

### 3. 版本控制與標籤管理
- 使用語義版本控制(SemVer)標記鏡像
- 自動化版本號更新
- 標籤推送至DockerHub
- 確保前端構建產物的版本一致性

### 4. 鏡像與緩存管理
- 監控構建過程中的緩存使用
- 記錄緩存命中率與效能
- 自動清理過期資源
- 最佳化TypeScript編譯和Next.js構建緩存

### 5. GitHub Pages部署
- 自動化構建靜態網站資源
- 使用GitHub Actions進行Pages部署
- 支援自定義域名配置
- 實現前端資源的CDN加速

## 儀表板功能

### 1. 使用統計
- 鏡像使用次數統計
- 獨立用戶數量追踪
- 構建時間分析
- 網站訪問量與用戶互動分析

### 2. 效能監控
- 構建效能追踪
- CI/CD流程監控
- 新舊鏡像效能對比
- 前端應用載入速度與效能指標

### 3. 系統管理
- 依賴包更新狀態
- 鏡像數量管理
- 緩存效能分析
- TypeScript類型檢查結果追踪

### 4. 通知與報告
- 構建推送通知
- 清理操作提醒
- 性能分析報告
- 前端構建與部署狀態通知