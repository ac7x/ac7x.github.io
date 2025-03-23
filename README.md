# AC7X 個人網站

這是一個使用 Next.js 構建的個人網站專案。

![版本](https://img.shields.io/badge/版本-1.0.0-blue)
![授權](https://img.shields.io/badge/授權-MIT-green)
![建置狀態](https://img.shields.io/badge/建置-通過-success)

## 功能特點

- 使用 Next.js 框架開發
- Docker 容器化部署
- GitHub Actions 自動化部署
- 依賴項自動更新 (Dependabot)

## 開發入門

### 先決條件

- Node.js 18+
- pnpm 

### 安裝

```bash
# 安裝依賴
pnpm install
```

### 開發伺服器

```bash
# 啟動開發伺服器
pnpm dev
```

### 構建

```bash
# 構建生產版本
pnpm build
```

## Docker 部署

```bash
# 構建 Docker 映像
docker build -t ac7x-website .

# 運行容器
docker run -p 3000:3000 ac7x-website
```

## 項目結構

請參閱 [專案目錄結構](.github/CONTRIBUTION_GUIDELINES.md) 獲取詳細的專案結構。

## 貢獻

有關如何貢獻的信息，請參閱 [貢獻指南](.github/CONTRIBUTING.md) 和 [貢獻規範](.github/CONTRIBUTION_GUIDELINES.md)。

## 路線圖

有關未來計劃的信息，請參閱 [專案路線圖](.github/ROADMAP.md)。

## 授權

[MIT 授權](LICENSE)