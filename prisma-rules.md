# Prisma 框架規則

> 生成版本: 2025.04.03-01d554c

這是 prisma 框架的適配規則文檔。

## 規則列表

| 規則 ID | 錯誤等級 | 說明 |
|--------|---------|------|
| require-select | block | Prisma query must explicitly specify select/include - Prisma 查詢必須明確指定 select/include |

## 詳細說明


### require-select

- **錯誤等級**: block
- **說明**: Prisma query must explicitly specify select/include - Prisma 查詢必須明確指定 select/include
- **文檔**: [查看詳情](https://ac7x.github.io/prisma-security)
- **模式**: `prisma\.\w+\.\w+\(\s*\{[^}]*?(?<!select|include)\s*\}\)`


**不符合規則的範例**:

```javascript
await prisma.user.findMany({ where: { active: true } })
```


**修復後的範例**:

```javascript
await prisma.user.findMany({ where: { active: true }, select: { id: true, name: true } })
```




---

[返回規則列表](./rules.md)
