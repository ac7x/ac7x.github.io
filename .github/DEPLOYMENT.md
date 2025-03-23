# 部署指南

本文檔詳細說明如何部署本專案。

## 環境準備

### 系統需求

- Node.js v18 或更高版本
- Docker 20.10 或更高版本
- 至少 1GB RAM 和 10GB 磁盤空間

### 環境變量

以下是必要的環境變量：

```
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgres://user:password@host:port/dbname
```

## 部署方法

### 方法一：Docker 部署

1. **構建 Docker 映像**

   ```bash
   docker build -t ac7x-website:latest .
   ```

2. **運行容器**

   ```bash
   docker run -d -p 3000:3000 \
     -e NODE_ENV=production \
     -e NEXT_PUBLIC_API_URL=https://api.example.com \
     --name ac7x-website \
     ac7x-website:latest
   ```

3. **檢查容器狀態**

   ```bash
   docker ps
   docker logs ac7x-website
   ```

### 方法二：直接部署

1. **安裝依賴**

   ```bash
   pnpm install --prod
   ```

2. **構建應用**

   ```bash
   pnpm build
   ```

3. **啟動應用**

   ```bash
   pnpm start
   ```

### 方法三：使用 GitHub Actions 自動部署

專案配置了自動部署工作流。當代碼推送到 `main` 分支時，GitHub Actions 會自動：

1. 運行測試
2. 構建 Docker 映像
3. 推送到容器註冊表
4. 部署到目標環境

詳細配置請參考 `.github/workflows/docker-publish.yml`。

## 部署後驗證

部署完成後，執行以下步驟以驗證部署是否成功：

1. 訪問網站首頁檢查是否正常載入
2. 檢查日誌是否有錯誤
3. 運行健康檢查

   ```bash
   curl -I http://your-domain.com/api/health
   ```

## 常見問題

### 網站載入慢

- 檢查伺服器資源使用情況
- 確認 CDN 配置是否正確
- 檢查資料庫查詢性能

### 部署失敗

- 檢查環境變量是否正確設置
- 確認伺服器有足夠的磁盤空間
- 檢查日誌獲取詳細錯誤信息

## 回滾策略

如果需要回滾到先前版本：

### Docker 部署

```bash
# 停止當前容器
docker stop ac7x-website

# 運行先前版本的映像
docker run -d -p 3000:3000 \
  -e NODE_ENV=production \
  --name ac7x-website \
  ac7x-website:previous-tag
```

### GitHub Actions 部署

在 GitHub 儲存庫頁面：

1. 前往 Actions 頁簽
2. 找到成功的先前部署工作流運行
3. 點擊 "Re-run jobs" 重新運行該工作流

## 監控和維護

### 日誌

應用日誌存儲在：

- Docker: 容器日誌中
- 直接部署: `/var/log/ac7x-website/`

### 健康檢查

定期檢查健康端點：

```
http://your-domain.com/api/health
```

### 備份

數據庫每日備份，存儲在：

```
/backup/database/daily/
```

## 安全注意事項

- 定期更新依賴
- 使用 HTTPS
- 設置適當的防火牆規則
- 實施速率限制
