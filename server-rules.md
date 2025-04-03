# Server 框架規則

> 生成版本: 2025.04.03-a04536d

這是 server 框架的適配規則文檔。

## 規則列表

| 規則 ID | 錯誤等級 | 說明 |
|--------|---------|------|
| no-client-hooks | error | Detected React Hook in Server Component - 伺服器元件中不應使用 React Hooks |
| server-action-error-handling | error | Server Actions 必須包含 try/catch 錯誤處理 |
| direct-prisma-call | warning | 服務層應封裝 Prisma 調用，禁止直接操作 |

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




### server-action-error-handling

- **錯誤等級**: error
- **說明**: Server Actions 必須包含 try/catch 錯誤處理

- **模式**: `export\s+async\s+function\s+\w+Action\s*\([^)]*\)\s*{(?!.*try)`


**不符合規則的範例**:

```javascript
export async function updateUser() {
  await prisma.user.update(...);
}
```


**修復後的範例**:

```javascript
export async function updateUser() {
  try {
    await prisma.user.update(...);
  } catch (error) {
    logger.error(error);
    throw new Error('Update failed');
  }
}
```




### direct-prisma-call

- **錯誤等級**: warning
- **說明**: 服務層應封裝 Prisma 調用，禁止直接操作

- **模式**: `prisma\.\w+\.\w+\(`




---

[返回規則列表](./rules.md)
