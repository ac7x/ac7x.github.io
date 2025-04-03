# Prisma 框架規則

這是 prisma 框架的適配規則文檔。

## 規則列表

| 規則 ID | 錯誤等級 | 說明 |
|--------|---------|------|
| require-select | block | Prisma query must explicitly specify select/include |

## 詳細說明


### require-select

- **錯誤等級**: block
- **說明**: Prisma query must explicitly specify select/include
- **文檔**: [查看詳情](https://ac7x.github.io/prisma-security)
- **模式**: `prisma\.\w+\.\w+\(\s*\{[^}]*?(?<!select|include)\s*\}\)`

