# Prisma 框架規則

> 生成版本: 2025.04.03-6da224a

這是 prisma 框架的適配規則文檔。

## 規則列表

| 規則 ID | 錯誤等級 | 說明 |
|--------|---------|------|
| require-select | block | Prisma 查询必须明确指定 select/include - 防止数据泄露 |
| no-client-prisma | error | 客户端禁止直接调用 Prisma - 请通过 Server Actions 执行 |

## 詳細說明


### require-select

- **錯誤等級**: block
- **說明**: Prisma 查询必须明确指定 select/include - 防止数据泄露
- **文檔**: [查看詳情](https://ac7x.github.io/prisma-security)
- **模式**: `prisma\.\w+\.\w+\(\s*\{[^}]*?(?<!select|include)\s*\}\)`


**不符合規則的範例**:

```javascript
await prisma.user.findMany({ where: { active: true } })
```


**修復後的範例**:

```javascript
await prisma.user.findMany({ where: { active: true }, select: { id: true } })
```




### no-client-prisma

- **錯誤等級**: error
- **說明**: 客户端禁止直接调用 Prisma - 请通过 Server Actions 执行

- **模式**: `prisma\.\w+\.`




---

[返回規則列表](./rules.md)
