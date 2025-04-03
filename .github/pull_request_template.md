## PR 描述
<!-- 簡述此 PR 的目的和更改 -->

## AI 代碼檢查
<!-- 如果此 PR 包含 AI 生成的代碼，請確認已完成以下檢查 -->

- [ ] 我已標記所有 AI 生成的代碼（使用目錄、檔案名稱或註釋標記）
- [ ] 我已執行 `npm run check-ai-code` 進行本地驗證
- [ ] 我已審閱並修正 AI 生成代碼中的潛在問題：

### 架構規則
- [ ] API 回應使用 ResponseDTO 結構封裝
- [ ] 資料修改後呼叫 revalidatePath 清除快取
- [ ] 敏感操作包含 CSRF 驗證

### Server 規則
- [ ] Server Actions 包含錯誤處理
- [ ] 服務層代碼正確抽象化

### 其他規則
- [ ] 沒有在客戶端直接使用 Prisma
- [ ] 資料庫查詢已指定 select/include
- [ ] DOM 操作已包裹在 useEffect

## 待解決問題
<!-- 此 PR 還有哪些未解決的問題？ -->