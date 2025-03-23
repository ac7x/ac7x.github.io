FROM node:20-alpine

# 安裝必要套件
RUN apk add --no-cache git curl bash jq python3 make g++ && \
    npm install -g pnpm@latest

# 設置 SHELL 和 PNPM_HOME 環境變數
ENV SHELL=/bin/bash
ENV PNPM_HOME=/usr/local/share/pnpm
ENV PATH="${PNPM_HOME}:${PATH}"

# 創建並設置 PNPM_HOME 目錄
RUN mkdir -p ${PNPM_HOME} && \
    chmod 777 ${PNPM_HOME}

# 設置 pnpm
RUN pnpm config set store-dir /.pnpm-store && \
    pnpm config set global-bin-dir ${PNPM_HOME}

# 安裝全局套件
RUN pnpm add -g vercel@latest && \
    pnpm add -g @actions/core @actions/github @actions/exec @actions/io

WORKDIR /app

ENV PATH="/app/node_modules/.bin:${PATH}"

EXPOSE 8000

# 驗證安裝
RUN echo "Node: $(node -v)" && \
    echo "npm: $(npm -v)" && \
    echo "pnpm: $(pnpm -v)" && \
    echo "Vercel: $(vercel -v)"

CMD ["bash"]