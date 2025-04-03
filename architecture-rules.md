# Architecture 框架規則

> 生成版本: 2025.04.03-f631c45

這是 architecture 框架的適配規則文檔。

## 規則列表

| 規則 ID | 錯誤等級 | 說明 |
|--------|---------|------|
| response-dto-format | warning | API 回應需包裹在 ResponseDTO 結構內 |
| cache-revalidation | warning | 資料異動後需呼叫 revalidatePath 清除快取 |
| csrf-header-check | error | 敏感操作需包含 CSRF Token 驗證標頭 |

## 詳細說明


### response-dto-format

- **錯誤等級**: warning
- **說明**: API 回應需包裹在 ResponseDTO 結構內

- **模式**: `return\s+JSON\.stringify\([^{]`


**不符合規則的範例**:

```javascript
return JSON.stringify(data);
```


**修復後的範例**:

```javascript
return ResponseDTO.success(data);
```




### cache-revalidation

- **錯誤等級**: warning
- **說明**: 資料異動後需呼叫 revalidatePath 清除快取

- **模式**: `await\s+prisma\.\w+\.(update|delete)(?!.*revalidatePath)`




### csrf-header-check

- **錯誤等級**: error
- **說明**: 敏感操作需包含 CSRF Token 驗證標頭

- **模式**: `headers\(\s*\)(?!.*'X-CSRF-Token')`




---

[返回規則列表](./rules.md)
