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

# 複製 package.json 和 pnpm-lock.yaml
COPY package*.json pnpm-lock.yaml ./

# 安裝依賴
RUN pnpm install --frozen-lockfile

# 複製源代碼
COPY . .

# 構建專案
RUN pnpm run build

# 最終階段
FROM base

# 設置工作目錄
WORKDIR /app

# 從生產階段複製必要文件
COPY --from=prod /app/package.json ./package.json
COPY --from=prod /app/node_modules ./node_modules
COPY --from=prod /app/dist ./dist

# 暴露端口
EXPOSE 8000

# 啟動應用程序
CMD ["pnpm", "start"]