FROM node:20-alpine

RUN apk add --no-cache git curl bash jq python3 make g++ && \
    npm install -g pnpm@latest

# 設置 pnpm 全局二進制目錄
RUN pnpm setup

RUN pnpm add -g vercel@latest

RUN pnpm add -g @actions/core @actions/github @actions/exec @actions/io

RUN pnpm config set store-dir /.pnpm-store

WORKDIR /app

ENV PATH="/app/node_modules/.bin:${PATH}"

EXPOSE 8000

RUN echo "Node: $(node -v)" && \
    echo "npm: $(npm -v)" && \
    echo "pnpm: $(pnpm -v)" && \
    echo "Vercel: $(vercel -v)"

CMD ["bash"]
