# Client 框架規則

> 生成版本: 2025.04.03-01d554c

這是 client 框架的適配規則文檔。

## 規則列表

| 規則 ID | 錯誤等級 | 說明 |
|--------|---------|------|
| no-document-access | warning | Direct document access should be wrapped in useEffect or similar - 直接訪問 document 對象應在 useEffect 等生命週期中進行 |

## 詳細說明


### no-document-access

- **錯誤等級**: warning
- **說明**: Direct document access should be wrapped in useEffect or similar - 直接訪問 document 對象應在 useEffect 等生命週期中進行

- **模式**: `document\.`


**不符合規則的範例**:

```javascript
const width = document.body.clientWidth;
```


**修復後的範例**:

```javascript
useEffect(() => { setWidth(document.body.clientWidth); }, []);
```




---

[返回規則列表](./rules.md)
