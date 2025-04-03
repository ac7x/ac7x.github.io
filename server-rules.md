# Server 框架規則

> 生成版本: 2025.04.03-e0b8851

這是 server 框架的適配規則文檔。

## 規則列表

| 規則 ID | 錯誤等級 | 說明 |
|--------|---------|------|
| no-client-hooks | error | Detected React Hook in Server Component - 伺服器元件中不應使用 React Hooks |

## 詳細說明


### no-client-hooks

- **錯誤等級**: error
- **說明**: Detected React Hook in Server Component - 伺服器元件中不應使用 React Hooks

- **模式**: `use[A-Z][a-zA-Z]*\(`


**不符合規則的範例**:

```javascript
export default function Page() {
  const [state] = useState();
}
```


**修復後的範例**:

```javascript
'use client';
export default function Page() {
  const [state] = useState();
}
```




---

[返回規則列表](./rules.md)
