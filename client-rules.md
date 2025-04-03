# Client 框架規則

> 生成版本: 2025.04.03-5fdf0de

這是 client 框架的適配規則文檔。

## 規則列表

| 規則 ID | 錯誤等級 | 說明 |
|--------|---------|------|
| no-document-access | warning | 直接访问 DOM 需包裹在 useEffect 中 - 避免 hydration 错误 |
| no-server-imports | error | 客户端禁止直接导入服务端模块或 Prisma - 请使用 Server Actions |
| form-transition-check | warning | 表單提交需包裹在 useTransition 內防重複提交 |

## 詳細說明


### no-document-access

- **錯誤等級**: warning
- **說明**: 直接访问 DOM 需包裹在 useEffect 中 - 避免 hydration 错误

- **模式**: `document\.`


**不符合規則的範例**:

```javascript
const width = document.body.clientWidth;
```


**修復後的範例**:

```javascript
useEffect(() => { setWidth(document.body.clientWidth); }, []);
```




### no-server-imports

- **錯誤等級**: error
- **說明**: 客户端禁止直接导入服务端模块或 Prisma - 请使用 Server Actions

- **模式**: `from\s+['"]@/(server|prisma)`




### form-transition-check

- **錯誤等級**: warning
- **說明**: 表單提交需包裹在 useTransition 內防重複提交
- **文檔**: [查看詳情](https://ac7x.github.io/nextjs-optimization#form-handling)
- **模式**: `<form(?!.*useTransition)`




---

[返回規則列表](./rules.md)
