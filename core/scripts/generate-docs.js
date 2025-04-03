const fs = require('fs');
const path = require('path');

// 簡單的文檔生成器
const RULES_DIR = path.join(__dirname, '../rules');
const OUTPUT_DIR = path.join(__dirname, '../../docs');
const BASE_URL = 'https://ac7x.github.io'; // 網站基礎 URL

// 建立輸出目錄
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`✅ 建立目錄: ${OUTPUT_DIR}`);
}

// 從 version.txt 讀取版本
let version = "未知版本";
try {
  if (fs.existsSync(path.join(__dirname, '../version.txt'))) {
    const versionContent = fs.readFileSync(path.join(__dirname, '../version.txt'), 'utf8');
    const versionMatch = versionContent.match(/\d+\.\d+\.\d+-[\w]+/);
    if (versionMatch) {
      version = versionMatch[0];
    }
  }
} catch (err) {
  console.warn('⚠️ 無法讀取版本信息:', err.message);
}

// 讀取規則檔案
console.log('開始生成文檔...');
let ruleFiles = [];
try {
  ruleFiles = fs.readdirSync(RULES_DIR)
    .filter(file => file.endsWith('.json') && file !== 'checksums.json');
} catch (err) {
  console.error(`❌ 讀取規則目錄時出錯: ${err.message}`);
  process.exit(1);
}

if (ruleFiles.length === 0) {
  console.warn('⚠️ 未找到規則檔案');
  // 繼續執行，生成空索引
}

// 格式化程式碼示例
function formatCodeExample(code, language = 'javascript') {
  return `\`\`\`${language}\n${code}\n\`\`\``;
}

// 生成每個規則檔案的文檔
ruleFiles.forEach(file => {
  try {
    const filePath = path.join(RULES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    let rules;
    
    try {
      rules = JSON.parse(content);
    } catch (error) {
      console.error(`❌ 無法解析 ${file}: ${error.message}`);
      return;
    }
    
    if (!rules.rules || !Array.isArray(rules.rules)) {
      console.warn(`⚠️ ${file} 中沒有發現規則陣列`);
      return;
    }

    const fileName = file.replace('.json', '');
    const outputPath = path.join(OUTPUT_DIR, `${fileName}-rules.md`);
    
    // 生成更豐富的 Markdown
    const mdContent = `# ${fileName.charAt(0).toUpperCase() + fileName.slice(1)} 框架規則

> 生成版本: ${version}

這是 ${fileName} 框架的適配規則文檔。

## 規則列表

| 規則 ID | 錯誤等級 | 說明 |
|--------|---------|------|
${rules.rules.map(rule => `| ${rule.id || '未命名'} | ${rule.errorLevel || 'warning'} | ${rule.message || '無說明'} |`).join('\n')}

## 詳細說明

${rules.rules.map(rule => `
### ${rule.id || '未命名規則'}

- **錯誤等級**: ${rule.errorLevel || 'warning'}
- **說明**: ${rule.message || '無說明'}
${rule.documentation ? `- **文檔**: [查看詳情](${rule.documentation})` : ''}
${rule.pattern ? `- **模式**: \`${rule.pattern}\`` : ''}

${rule.examples ? `
**不符合規則的範例**:

${formatCodeExample(rule.examples.invalid)}

${rule.examples.fixed ? `
**修復後的範例**:

${formatCodeExample(rule.examples.fixed)}
` : ''}
` : ''}
`).join('\n')}

---

[返回規則列表](./rules.md)
`;
    
    fs.writeFileSync(outputPath, mdContent);
    console.log(`✅ 已生成: ${outputPath}`);
  } catch (error) {
    console.error(`❌ 處理 ${file} 時出錯: ${error.message}`);
  }
});

// 生成索引頁面
const indexPath = path.join(OUTPUT_DIR, 'rules.md');
const indexContent = `# 框架規則文檔

歡迎使用框架適配倉儲規則中心。這裡列出了所有支援的框架規則。

## 規則集列表

${ruleFiles.length > 0 ? 
  ruleFiles.map(file => {
    const name = file.replace('.json', '');
    return `- [${name.charAt(0).toUpperCase() + name.slice(1)} 規則](${name}-rules.md)`;
  }).join('\n') : 
  '目前尚無可用的規則集。'
}

## 版本訊息

當前文件版本: ${version}

更新於: ${new Date().toISOString().split('T')[0]}
`;

fs.writeFileSync(indexPath, indexContent);
console.log(`✅ 索引頁已生成`);