# Security 框架規則

這是 security 框架的適配規則文檔。

## 規則列表

| 規則 ID | 錯誤等級 | 說明 |
|--------|---------|------|
| no-eval | block | Avoid using eval() as it poses security risks - eval() 函數存在安全風險，應避免使用 |

## 詳細說明


### no-eval

- **錯誤等級**: block
- **說明**: Avoid using eval() as it poses security risks - eval() 函數存在安全風險，應避免使用
- **文檔**: [查看詳情](https://ac7x.github.io/security-rules)
- **模式**: `eval\(|Function\(['"]return`

