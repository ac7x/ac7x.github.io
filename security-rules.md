# Security 框架規則

> 生成版本: 2025.04.03-5fdf0de

這是 security 框架的適配規則文檔。

## 規則列表

| 規則 ID | 錯誤等級 | 說明 |
|--------|---------|------|
| no-eval | block | 禁止使用 eval() - 存在代码注入风险 |
| no-env-leak | error | 禁止在客户端暴露敏感环境变量 - 仅允许 NEXT_PUBLIC_ 前缀 |
| require-zod-validation | error | FormData 取值必須經過 Zod 解析驗證 |
| sensitive-data-logging | block | 禁止記錄敏感參數到日誌 |

## 詳細說明


### no-eval

- **錯誤等級**: block
- **說明**: 禁止使用 eval() - 存在代码注入风险
- **文檔**: [查看詳情](https://ac7x.github.io/security-rules)
- **模式**: `eval\(|Function\(['"]return`


**不符合規則的範例**:

```javascript
function runCode(code) {
  return eval(code);
}
```


**修復後的範例**:

```javascript
function runCode(code) {
  return JSON.parse(code);
}
```




### no-env-leak

- **錯誤等級**: error
- **說明**: 禁止在客户端暴露敏感环境变量 - 仅允许 NEXT_PUBLIC_ 前缀

- **模式**: `process\.env\.(?!NEXT_PUBLIC_)`




### require-zod-validation

- **錯誤等級**: error
- **說明**: FormData 取值必須經過 Zod 解析驗證

- **模式**: `FormData\.get\(.*\)(?!.*zod\.)`


**不符合規則的範例**:

```javascript
const email = formData.get('email');
```


**修復後的範例**:

```javascript
const { email } = signupSchema.parse(formData);
```




### sensitive-data-logging

- **錯誤等級**: block
- **說明**: 禁止記錄敏感參數到日誌

- **模式**: `console\.log\(.*(password|token).*\)`




---

[返回規則列表](./rules.md)
