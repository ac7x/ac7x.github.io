const fs = require('fs');
const path = require('path');

// 檢查每個規則檔案中的範例
const RULES_DIR = path.join(__dirname, '../rules');
let hasError = false;

// 確保規則目錄存在
if (!fs.existsSync(RULES_DIR)) {
  console.error(`❌ 規則目錄不存在: ${RULES_DIR}`);
  process.exit(1);
}

// 取得所有 JSON 規則檔案
const ruleFiles = fs.readdirSync(RULES_DIR)
  .filter(file => file.endsWith('.json') && file !== 'checksums.json');

if (ruleFiles.length === 0) {
  console.warn('⚠️ 未找到規則檔案');
  process.exit(0);
}

// 驗證每個檔案
ruleFiles.forEach(file => {
  const filePath = path.join(RULES_DIR, file);
  let rules;
  
  try {
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    rules = JSON.parse(rawContent);
  } catch (err) {
    console.error(`❌ 檔案解析錯誤: ${file}`);
    console.error(err.message);
    hasError = true;
    return;
  }
  
  // 驗證規則結構
  if (!rules.rules || !Array.isArray(rules.rules)) {
    console.error(`❌ 檔案格式錯誤: ${file} - 缺少 rules 陣列`);
    hasError = true;
    return;
  }
  
  // 檢查每個規則
  rules.rules.forEach(rule => {
    if (!rule.id) {
      console.error(`❌ 規則缺少 ID: ${file}`);
      hasError = true;
      return;
    }
    
    // 驗證 pattern 是正確的正則表達式
    if (rule.pattern) {
      try {
        new RegExp(rule.pattern);
      } catch (err) {
        console.error(`❌ 規則 ${rule.id} 的正則表達式無效: ${rule.pattern}`);
        console.error(err.message);
        hasError = true;
      }
    } else {
      console.error(`❌ 規則 ${rule.id} 缺少 pattern`);
      hasError = true;
    }
    
    // 驗證範例
    if (rule.examples) {
      if (!rule.examples.invalid) {
        console.error(`❌ 規則 ${rule.id} 缺少無效範例`);
        hasError = true;
      }
      
      if (rule.autoFix && !rule.examples.fixed) {
        console.error(`❌ 規則 ${rule.id} 有自動修復但缺少修復後的範例`);
        hasError = true;
      }
      
      // 檢查 pattern 是否符合無效範例
      if (rule.pattern && rule.examples.invalid) {
        const regex = new RegExp(rule.pattern);
        if (!regex.test(rule.examples.invalid)) {
          console.error(`❌ 規則 ${rule.id} 的 pattern 不符合其無效範例`);
          hasError = true;
        }
      }
    } else if (rule.errorLevel !== 'info') {
      console.warn(`⚠️ 規則 ${rule.id} 缺少範例`);
    }
  });
});

if (hasError) {
  console.error('❌ 驗證失敗，請修正上述錯誤');
  process.exit(1);
} else {
  console.log('✅ 所有規則範例驗證通過');
}