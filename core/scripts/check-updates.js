const fs = require('fs');
const path = require('path');
const https = require('https');

// 檔案路徑
const VERSION_FILE = path.join(__dirname, '../version.txt');

// 從檔案讀取本地版本
function getLocalVersion() {
  if (!fs.existsSync(VERSION_FILE)) {
    console.warn('⚠️ 版本檔案不存在，建立預設版本');
    const defaultVersion = new Date().toISOString().split('T')[0];
    fs.writeFileSync(VERSION_FILE, defaultVersion);
    return defaultVersion;
  }
  
  const content = fs.readFileSync(VERSION_FILE, 'utf-8').trim();
  // 移除可能存在的腳本註解
  const versionLine = content.split('\n').find(line => !line.trim().startsWith('#'));
  return versionLine ? versionLine.trim() : '';
}

// 從遠端取得版本資訊
async function fetchRemoteVersion() {
  return new Promise((resolve, reject) => {
    // 這裡替換成實際的遠端版本檢查 URL
    const url = 'https://api.github.com/repos/ac7x/ac7x.github.io/releases/latest';
    
    https.get(url, { headers: { 'User-Agent': 'node.js' } }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`請求失敗，狀態碼: ${res.statusCode}`));
        return;
      }
      
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const release = JSON.parse(data);
          resolve(release.tag_name || release.name);
        } catch (err) {
          reject(new Error(`解析版本資訊失敗: ${err.message}`));
        }
      });
    }).on('error', reject);
  });
}

// 比較版本 (簡單的日期比較)
function compareVersions(v1, v2) {
  const date1 = new Date(v1.split('-')[0]);
  const date2 = new Date(v2.split('-')[0]);
  
  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
    return v1.localeCompare(v2); // 無法解析為日期時，進行字串比較
  }
  
  return date1.getTime() - date2.getTime();
}

// 主函式
async function checkUpdates() {
  try {
    const localVersion = getLocalVersion();
    console.log(`本地版本: ${localVersion}`);
    
    let remoteVersion;
    try {
      remoteVersion = await fetchRemoteVersion();
      console.log(`遠端版本: ${remoteVersion}`);
    } catch (err) {
      console.warn(`⚠️ 無法取得遠端版本: ${err.message}`);
      console.warn('繼續使用本地版本');
      process.exit(0);
    }
    
    if (compareVersions(localVersion, remoteVersion) < 0) {
      console.log('⚠️ 有新版本的提示詞規則可用!');
      process.exit(1); // 非零退出碼，CI 會視為失敗
    } else {
      console.log('✅ 已是最新版本');
    }
  } catch (err) {
    console.error(`❌ 檢查更新時發生錯誤: ${err.message}`);
    process.exit(1);
  }
}

// 執行檢查
checkUpdates();