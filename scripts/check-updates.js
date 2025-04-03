// scripts/check-updates.js
const fs = require('fs');
const semver = require('semver');

const localVersion = fs.readFileSync('nextjs/version.txt', 'utf-8').trim();
const remoteVersion = await fetchRemoteVersion(); 

if (semver.gt(remoteVersion, localVersion)) {
  console.log('⚠️  New prompt rules available!');
  process.exit(1); // CI 會失敗以強制更新
}