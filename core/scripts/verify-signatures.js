const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// 使用檔案雜湊方式替代簽名驗證
const RULES_DIR = path.join(__dirname, '../rules');
const HASH_FILE = path.join(__dirname, '../rules/checksums.json');

function generateFileHash(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return crypto.createHash('sha256').update(content).digest('hex');
}

function verifyFiles() {
  // 如果還沒有雜湊檔案，則建立一個
  if (!fs.existsSync(HASH_FILE)) {
    console.log('建立新的檔案雜湊清單');
    const ruleFiles = fs.readdirSync(RULES_DIR).filter(file => file.endsWith('.json') && file !== 'checksums.json');
    const checksums = {};
    
    ruleFiles.forEach(file => {
      const filePath = path.join(RULES_DIR, file);
      checksums[file] = generateFileHash(filePath);
    });
    
    fs.writeFileSync(HASH_FILE, JSON.stringify(checksums, null, 2));
    return true;
  }
  
  // 驗證現有檔案的雜湊值
  const storedChecksums = JSON.parse(fs.readFileSync(HASH_FILE, 'utf-8'));
  let allValid = true;
  
  Object.keys(storedChecksums).forEach(file => {
    const filePath = path.join(RULES_DIR, file);
    
    if (!fs.existsSync(filePath)) {
      console.error(`❌ 檔案不存在: ${file}`);
      allValid = false;
      return;
    }
    
    const currentHash = generateFileHash(filePath);
    if (currentHash !== storedChecksums[file]) {
      console.error(`❌ 檔案雜湊值不符: ${file}`);
      console.error(`  預期: ${storedChecksums[file]}`);
      console.error(`  實際: ${currentHash}`);
      allValid = false;
    }
  });
  
  return allValid;
}

// 執行驗證
const isValid = verifyFiles();
if (!isValid) {
  process.exit(1);
} else {
  console.log('✅ 所有檔案驗證通過');
}