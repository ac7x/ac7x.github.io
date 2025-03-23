# 使用 Node.js 20 的精簡版作為基礎映像
FROM node:20-slim AS base

# 設置 PNPM 的環境變數
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME/bin:$PATH"

# 啟用 Corepack 並安裝最新版本的 pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# 生產環境階段
FROM base AS prod

# 設置工作目錄
WORKDIR /app

# 複製 pnpm-lock.yaml 文件
COPY pnpm-lock.yaml ./

# 獲取生產依賴
RUN pnpm fetch --prod

# 複製所有文件到工作目錄
COPY . .

# 構建項目
RUN pnpm run build

# 最終階段
FROM base

# 設置工作目錄
WORKDIR /app

# 從生產階段複製 node_modules 和構建結果
COPY --from=prod /app/node_modules ./node_modules
COPY --from=prod /app/dist ./dist

# 暴露端口
EXPOSE 8000

# 啟動應用程序
CMD [ "pnpm", "start" ]