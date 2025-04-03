const fs = require('fs');
const path = require('path');

// 所有規則檔案路徑
const RULES_DIR = path.join(__dirname, '../rules');
const OUTPUT_DIR = path.join(__dirname, '../../docs');

// 確保輸出目錄存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 讀取所有規則檔案
const ruleFiles = fs.readdirSync(RULES_DIR)
  .filter(file => file.endsWith('.json') && file !== 'checksums.json');

// 處理每個檔案
ruleFiles.forEach(file => {
  try {
    const filePath = path.join(RULES_DIR, file);
    const rules = require(filePath);
    
    if (!rules.rules || !Array.isArray(rules.rules)) {
      console.warn(`⚠️ 檔案格式錯誤: ${file} - 跳過文件生成`);
      return;
    }
    
    const fileName = file.replace('.json', '');
    const outputPath = path.join(OUTPUT_DIR, `${fileName}-rules.md`);
    
    // 生成 Markdown 內容
    const mdContent = `
# ${fileName.charAt(0).toUpperCase() + fileName.slice(1)} 規則

| 規則 ID | 錯誤等級 | 自動修復 | 說明 |
|--------|----------|----------|------|
${rules.rules.map(rule => `| ${rule.id} | ${rule.errorLevel} | ${rule.autoFix ? '✅' : '❌'} | ${rule.message || ''} |`).join('\n')}

## 詳細說明

${rules.rules.map(rule => `
### ${rule.id}

- **錯誤等級**: ${rule.errorLevel}
- **訊息**: ${rule.message || '無'}
- **自動修復**: ${rule.autoFix ? '支援' : '不支援'}
${rule.documentation ? `- **文件**: [查看詳情](${rule.documentation})` : ''}

${rule.pattern ? `**規則模式**:
\`\`\`regex
${rule.pattern}
\`\`\`
` : ''}

${rule.examples ? `**範例**:

無效代碼:
\`\`\`javascript
${rule.examples.invalid}
\`\`\`

${rule.examples.fixed ? `修復後:
\`\`\`javascript
${rule.examples.fixed}
\`\`\`
` : ''}
` : ''}
`).join('\n')}
`;
    
    fs.writeFileSync(outputPath, mdContent);
    console.log(`✅ 已生成文件: ${outputPath}`);
    
  } catch (err) {
    console.error(`❌ 處理檔案 ${file} 時出錯:`);
    console.error(err);
  }
});

// 生成索引頁
const indexPath = path.join(OUTPUT_DIR, 'rules-index.md');
const indexContent = `
# 提示詞規則索引

以下是所有可用的規則集:

${ruleFiles.map(file => {
  const name = file.replace('.json', '');
  return `- [${name.charAt(0).toUpperCase() + name.slice(1)} 規則](${name}-rules.md)`;
}).join('\n')}
`;

fs.writeFileSync(indexPath, indexContent);
console.log(`✅ 已生成索引文件: ${indexPath}`);