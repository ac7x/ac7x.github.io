# 部署指南

本文檔提供 AC7X 專案的部署方法和最佳實踐。

## 部署選項

本專案支持多種部署選項，可根據需求選擇最適合的方式：

### 1. GitHub Pages (靜態部署)

適用於靜態網站內容。

#### 自動部署 (推薦)

專案已配置 GitHub Actions 工作流實現自動部署：

1. 每當推送到 `main` 分支時，會自動構建並部署到 GitHub Pages
2. 部署進度可在 Actions 頁面查看

#### 手動部署

```bash
# 構建靜態文件
pnpm build

# 部署到 GitHub Pages
pnpm deploy
```

### 2. Docker 容器部署

適用於需要更多控制或伺服器端功能的場景。

#### 構建 Docker 映像

```bash
# 在專案根目錄執行
docker build -t ac7x-website .

# 啟動容器
docker run -p 3000:3000 ac7x-website
```

#### 使用 Docker Compose

專案包含 `docker-compose.yml` 配置文件，可用於更複雜的部署場景：

```bash
# 啟動所有服務
docker-compose up -d

# 查看日誌
docker-compose logs -f
```

### 3. Vercel / Netlify 部署

適用於需要 CI/CD 和自動預覽功能的團隊。

1. 在 Vercel/Netlify 上連接 GitHub 倉庫
2. 選擇 Next.js 框架預設
3. 配置環境變數
4. 部署

## 環境變數配置

根據不同部署環境，需要配置以下環境變數：

| 變數名 | 說明 | 範例 |
|-------|-----|-----|
| `NODE_ENV` | 執行環境 | `production`, `development` |
| `API_URL` | API 服務地址 | `https://api.example.com` |
| `ANALYTICS_ID` | 分析工具 ID | `UA-XXXXXXXX-X` |

## 部署檢查清單

每次部署前請檢查：

- [ ] 所有測試通過 (`pnpm test`)
- [ ] 代碼格式和 lint 檢查通過 (`pnpm lint`)
- [ ] 構建成功並生成預期文件 (`pnpm build`)
- [ ] 環境變數設置正確
- [ ] 資源文件路徑使用相對路徑或 CDN 路徑

## 部署後驗證

部署完成後請驗證：

1. 網站能正常訪問
2. 所有頁面載入無錯誤
3. 核心功能正常工作
4. 性能達到預期水平 (通過 Lighthouse 或類似工具檢查)

## 回滾策略

如發現部署問題需要回滾：

### GitHub Pages

1. 在 Actions 頁面找到之前成功的部署
2. 重新運行該工作流

### Docker

```bash
# 列出可用的映像版本
docker images

# 停止當前容器
docker stop [container-id]

# 啟動使用先前映像的容器
docker run -p 3000:3000 ac7x-website:[previous-tag]
```

## 監控和日誌

建議配置以下監控方案：

1. 使用 Uptime Robot 或類似服務監控網站可用性
2. 配置錯誤跟踪 (Sentry 等)
3. 設置性能監控 (Google Analytics, Lighthouse)

## 常見問題解決

### 靜態資源無法載入

- 檢查 `next.config.js` 中的 `assetPrefix` 配置
- 確保 CDN 路徑正確

### 部署後頁面返回 404

- 檢查路由配置
- 確認 `next.config.js` 中的 `basePath` 設置

### API 連接失敗

- 驗證環境變數是否正確設置
- 檢查 CORS 配置
- 確認網絡安全組/防火牆規則
