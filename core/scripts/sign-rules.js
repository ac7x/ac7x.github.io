const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// 使用檔案雜湊替代簽名
const RULES_DIR = path.join(__dirname, '../rules');
const HASH_FILE = path.join(RULES_DIR, 'checksums.json');

function generateChecksums() {
  const ruleFiles = fs.readdirSync(RULES_DIR)
    .filter(file => file.endsWith('.json') && file !== 'checksums.json');
  
  const checksums = {};
  
  ruleFiles.forEach(file => {
    const filePath = path.join(RULES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const hash = crypto.createHash('sha256').update(content).digest('hex');
    checksums[file] = hash;
  });
  
  fs.writeFileSync(HASH_FILE, JSON.stringify(checksums, null, 2));
  console.log(`✅ 已生成檔案雜湊值，共 ${ruleFiles.length} 個檔案`);
}

generateChecksums();