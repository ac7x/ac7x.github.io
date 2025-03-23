FROM your-dockerhub-username/base-image:latest

# 確保 PNPM_HOME 環境變數正確設置
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME/bin:$PATH"

# 設置工作目錄
WORKDIR /app

# 複製專案文件
COPY . .

# 安裝依賴
RUN corepack enable && \
    corepack prepare pnpm@latest --activate && \
    pnpm install

# 構建專案（如果需要）
RUN pnpm run build

# 啟動應用
CMD ["pnpm", "start"]