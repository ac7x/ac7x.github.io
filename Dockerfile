# 使用 Node.js 20 作为基础镜像
FROM node:23

# 设置工作目录
WORKDIR /app

# 安装 PNPM
RUN npm install -g pnpm

# 安装 Vercel CLI
RUN npm install -g vercel

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# 安装依赖
RUN pnpm install

# 复制项目文件
COPY . .

# 构建项目（如果需要）
RUN pnpm run build

# 暴露端口（如果需要）
EXPOSE 3000

# 启动命令（根据你的项目需求调整）
CMD ["pnpm", "start"]