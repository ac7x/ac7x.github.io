# AI 提示詞管理倉儲Web面板

webpanel/src/pages/
├─index.tsx          # 儀表板
├─prompts/           # 提示詞管理
│   ├─browse.tsx     # 瀏覽所有提示詞
│   ├─edit/[id].tsx  # 編輯單個提示詞
│   └─create.tsx     # 創建新提示詞
├─analytics.tsx      # 使用分析
└─settings.tsx       # 系統設置

│  .env.local
│  next.config.js
│  package.json
│  README.md
│  
├─public
└─src
    ├─api
    ├─components
    ├─pages
    ├─stores
    └─styles