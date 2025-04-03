const fs = require('fs');
const path = require('path');

// 簡單的文檔生成器
const RULES_DIR = path.join(__dirname, '../rules');
const OUTPUT_DIR = path.join(__dirname, '../../docs');

// 建立輸出目錄
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`✅ 建立目錄: ${OUTPUT_DIR}`);
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
    
    // 簡單地生成 Markdown
    const mdContent = `# ${fileName.charAt(0).toUpperCase() + fileName.slice(1)} 框架規則

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
`).join('\n')}
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
`;

fs.writeFileSync(indexPath, indexContent);
console.log(`✅ 索引頁已生成`);