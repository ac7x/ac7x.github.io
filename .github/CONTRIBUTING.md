# 貢獻指南

感謝您考慮為本專案做出貢獻！以下是參與專案開發的指南。

## 前置準備

在開始貢獻之前，請確保您已經：

1. 安裝了 Node.js (推薦 v18 或更高版本)
2. 安裝了 pnpm (推薦 v7 或更高版本)
3. Fork 了本儲存庫並 clone 到本地

## 開發流程

1. **設置開發環境**
   ```bash
   # 克隆您 fork 的儲存庫
   git clone https://github.com/YOUR_USERNAME/ac7x.github.io.git
   cd ac7x.github.io

   # 安裝依賴
   pnpm install

   # 設置開發環境
   node scripts/setup-node.js
   ```

2. **創建分支**
   ```bash
   # 為您的貢獻創建一個新分支
   git checkout -b feature/your-feature-name
   ```

3. **進行修改**
   - 撰寫代碼
   - 撰寫測試
   - 確保所有測試通過

4. **提交修改**
   ```bash
   # 添加修改
   git add .

   # 提交修改（請遵循提交規範）
   git commit -m "✨ 添加新功能：功能描述"
   ```

5. **推送到您的 fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **提交 Pull Request**
   - 前往 GitHub 儲存庫頁面
   - 點擊 "Compare & pull request"
   - 填寫 PR 標題和描述
   - 提交 PR

## 代碼風格

- 遵循專案的 ESLint 和 TypeScript 配置
- 使用 2 空格縮進
- 使用有意義的變量和函數名稱
- 添加適當的注釋

## 測試

- 確保所有現有測試通過
- 為新功能或修復的錯誤添加適當的測試
- 確保測試覆蓋率不會下降

```bash
# 運行測試
pnpm test

# 運行測試並生成覆蓋率報告
pnpm test:coverage
```

## 文檔

- 更新受影響功能的文檔
- 為新功能添加文檔
- 確保文檔與代碼同步

## 提交規範

請參閱 [貢獻規範](CONTRIBUTION_GUIDELINES.md) 了解提交訊息格式、分支命名等詳細要求。

## 問題和討論

- 使用 Issues 報告錯誤或提出功能請求
- 參與現有 Issues 和 PR 的討論
- 在實現重大變更之前先討論

## 審核流程

- 所有 PR 需要至少一位維護者的審核通過
- 自動化測試必須通過
- 代碼審核意見需要被解決

## 行為準則

- 尊重其他貢獻者
- 保持建設性和專業的討論
- 接受建設性的批評和反饋

感謝您的貢獻！
