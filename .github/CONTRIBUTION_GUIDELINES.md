# 貢獻規範

## 提交規範

### 提交訊息格式
參考 Dependabot 配置中的提交訊息前綴：
- 📦 用於 pnpm 依賴更新
- 🐳 用於 Docker 相關更新
- 👷 用於 GitHub Actions 更新
- 🔍 用於容器健康檢查相關更新

建議一般提交也遵循類似的 emoji 前綴風格，例如：
- ✨ 新功能
- 🐛 錯誤修復
- 📝 文檔更新
- 🎨 代碼格式調整

### 分支命名
- 功能分支：`feature/功能名稱`
- 修復分支：`fix/錯誤描述`
- 文檔分支：`docs/更新內容`

## PR 審核流程
1. 確保 PR 標題清晰描述變更
2. 添加適當的標籤（可參考 dependabot.yml 中的標籤使用）
3. 通過所有自動化測試
4. 至少獲得一位維護者的審核通過

# 專案目錄結構

/
├── Dockerfile                   # Docker 鏡像構建配置文件
├── README.md                    # 專案的主要說明文件
├── scripts/                     # 存放專案相關的腳本文件
│   ├── pnpm-store-monitor.js    # pnpm 存儲監控腳本
│   ├── cleanup.js               # 清理快取腳本
│   └── setup-node.js            # Node.js 環境設置腳本
└── .github/                     # GitHub 相關配置和文件
    ├── ARCHITECTURE.md          # 專案架構說明文件
    ├── CONTRIBUTING.md          # 貢獻指南，說明如何參與專案開發
    ├── dependabot.yml           # Dependabot 配置文件，用於自動更新依賴項
    ├── DEPLOYMENT.md            # 部署指南，說明如何部署專案
    ├── DEVELOPMENT_GUIDELINES.md # 開發指南，說明開發流程和規範
    ├── PROJECT_GUIDELINES.md    # 專案指南，說明專案管理和維護規範
    ├── ROADMAP.md               # 專案路線圖，說明未來的開發計劃
    └── workflows/               # GitHub Actions 工作流目錄
        ├── docker-publish.yml      # Docker 鏡像構建和發布工作流
        ├── dependency-review.yml   # 依賴項安全審查工作流
        └── codeql-analysis.yml     # 程式碼質量分析工作流