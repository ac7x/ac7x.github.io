# Server 框架規則

這是 server 框架的適配規則文檔。

## 規則列表

| 規則 ID | 錯誤等級 | 說明 |
|--------|---------|------|
| no-client-hooks | error | Detected React Hook in Server Component |

## 詳細說明


### no-client-hooks

- **錯誤等級**: error
- **說明**: Detected React Hook in Server Component

- **模式**: `use[A-Z][a-zA-Z]*\(`

