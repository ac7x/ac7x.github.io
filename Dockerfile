FROM node:18-alpine AS base

# 安裝 pnpm
ENV PNPM_HOME=/usr/local/bin
RUN corepack enable

# 設置工作目錄
WORKDIR /app

# 安裝依賴項
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# 構建應用
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# 生產映像
FROM base AS runner
ENV NODE_ENV production

# 創建非 root 用戶
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# 複製必要檔案
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 暴露端口
EXPOSE 3000

# 健康檢查
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD ["node", "scripts/health-check.js"]

# 啟動應用
CMD ["node", "server.js"]