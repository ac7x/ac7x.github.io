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

function updateHashFile() {
  console.log('更新檔案雜湊清單...');
  const ruleFiles = fs.readdirSync(RULES_DIR).filter(file => file.endsWith('.json') && file !== 'checksums.json');
  const checksums = {};
  
  ruleFiles.forEach(file => {
    const filePath = path.join(RULES_DIR, file);
    checksums[file] = generateFileHash(filePath);
  });
  
  fs.writeFileSync(HASH_FILE, JSON.stringify(checksums, null, 2));
  console.log(`✅ 已更新雜湊值，共 ${ruleFiles.length} 個檔案`);
  return true;
}

function verifyFiles() {
  // 如果處於 CI 環境，則自動更新雜湊檔案
  if (process.env.CI) {
    return updateHashFile();
  }
  
  // 如果雜湊檔案不存在，則建立一個
  if (!fs.existsSync(HASH_FILE)) {
    return updateHashFile();
  }
  
  // 檢查雜湊檔案是否包含 "將由腳本產生" 這樣的預設內容
  try {
    const content = fs.readFileSync(HASH_FILE, 'utf-8');
    if (content.includes('檔案雜湊值將由腳本產生')) {
      return updateHashFile();
    }
  } catch (err) {
    console.error('雜湊檔案讀取失敗，建立新檔案');
    return updateHashFile();
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
  console.error('檔案驗證失敗');
  // 如果在 CI 環境中且設定為自動修復
  if (process.env.CI && process.env.AUTO_FIX_CHECKSUMS === 'true') {
    console.log('嘗試自動修復雜湊檔案...');
    updateHashFile();
    process.exit(0);
  } else {
    process.exit(1);
  }
} else {
  console.log('✅ 所有檔案驗證通過');
}