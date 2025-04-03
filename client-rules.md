# Client 框架規則

這是 client 框架的適配規則文檔。

## 規則列表

| 規則 ID | 錯誤等級 | 說明 |
|--------|---------|------|
| no-document-access | warning | Direct document access should be wrapped in useEffect or similar |

## 詳細說明


### no-document-access

- **錯誤等級**: warning
- **說明**: Direct document access should be wrapped in useEffect or similar

- **模式**: `document\.`

