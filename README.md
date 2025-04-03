# AI 提示詞管理倉儲

ac7x.github.io:.
│  README.md
│
├─.github
│  └─workflows
│          deploy-docs.yml
│          sync-rules.yml
│          validate-prompts.yml
│          deploy-webpanel.yml  # 新增：專門部署 Web 面板的工作流
│
├─nextjs
│      client-rules.json
│      metadata.json
│      server-rules.json
│      version.txt
│
├─scripts
│      check-updates.js
│      generate-docs.js
│      sign-rules.js
│      validate-examples.js
│      verify-signatures.js
│      
├─shared
│      prisma-rules.json
│      security-rules.json
│
└─webpanel  # 全新的獨立 Web 面板目錄
    ├─public      # 靜態資源
    ├─src         # 前端源碼
    │   ├─api     # API 請求層
    │   ├─components  # 共用組件
    │   ├─pages   # 頁面路由
    │   ├─stores  # 狀態管理
    │   └─styles  # 全局樣式
    ├─package.json
    ├─next.config.js  # 如果是 Next.js 項目
    └─.env.local      # 環境變量