const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const RULES_DIR = path.join(__dirname, '../rules');

// 測試規則檢測能力
test('規則能夠正確識別程式碼模式', async () => {
  // 讀取規則檔案
  const ruleFiles = fs.readdirSync(RULES_DIR)
    .filter(file => file.endsWith('.json') && file !== 'checksums.json');
    
  for (const file of ruleFiles) {
    const filePath = path.join(RULES_DIR, file);
    const rules = require(filePath);
    
    if (!rules.rules || !Array.isArray(rules.rules)) {
      continue;
    }
    
    // 測試每個具有範例的規則
    for (const rule of rules.rules) {
      if (!rule.examples || !rule.pattern) continue;
      
      const regex = new RegExp(rule.pattern);
      
      // 驗證無效範例確實違反規則
      if (rule.examples.invalid) {
        expect(regex.test(rule.examples.invalid)).toBe(true);
      }
      
      // 驗證修復後的範例不再違反規則（如果適用）
      if (rule.autoFix && rule.examples.fixed) {
        // 如果是 server.json 中的 use client 規則，則略過這項檢查
        if (file === 'server.json' && rule.id === 'no-client-hooks') continue;
        
        expect(regex.test(rule.examples.fixed)).toBe(false);
      }
    }
  }
});