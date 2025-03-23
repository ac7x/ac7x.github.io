#!/usr/bin/env node

/**
 * Node.js 環境設置腳本
 * 
 * 此腳本用於設置和配置 Node.js 開發環境，
 * 包括安裝必要的全局包、設置開發工具等
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// 配置
const CONFIG = {
  requiredNodeVersion: '18.0.0',
  requiredPnpmVersion: '7.0.0',
  globalPackages: [
    'typescript',
    'eslint',
    'prettier'
  ],
  projectRoot: path.resolve(__dirname, '..'),
  configureGitHooks: true
};

// 記錄訊息
function log(message, type = 'INFO') {
  console.log(`[${type}] ${message}`);
}

// 執行命令並處理錯誤
function executeCommand(command) {
  try {
    log(`執行命令: ${command}`);
    return execSync(command, { encoding: 'utf-8' });
  } catch (error) {
    log(`命令失敗: ${command}`, 'ERROR');
    log(error.message, 'ERROR');
    return null;
  }
}

// 檢查工具版本
function checkVersion(command, regex, requiredVersion) {
  try {
    const output = execSync(command, { encoding: 'utf-8' });
    const match = output.match(regex);
    
    if (match && match[1]) {
      const currentVersion = match[1];
      log(`檢測到版本: ${currentVersion}`);
      
      if (isVersionSatisfied(currentVersion, requiredVersion)) {
        return true;
      } else {
        log(`版本不滿足要求: 需要 >=${requiredVersion}，實際 ${currentVersion}`, 'WARNING');
        return false;
      }
    }
    
    log(`無法解析版本信息`, 'ERROR');
    return false;
  } catch (error) {
    log(`檢查版本失敗: ${error.message}`, 'ERROR');
    return false;
  }
}

// 版本比較
function isVersionSatisfied(current, required) {
  const currentParts = current.split('.').map(p => parseInt(p, 10));
  const requiredParts = required.split('.').map(p => parseInt(p, 10));
  
  for (let i = 0; i < Math.max(currentParts.length, requiredParts.length); i++) {
    const currentPart = currentParts[i] || 0;
    const requiredPart = requiredParts[i] || 0;
    
    if (currentPart > requiredPart) return true;
    if (currentPart < requiredPart) return false;
  }
  
  return true; // 版本相同
}

// 安裝全局包
function installGlobalPackages() {
  log('安裝全局包...');
  
  for (const pkg of CONFIG.globalPackages) {
    log(`安裝 ${pkg}...`);
    executeCommand(`pnpm add -g ${pkg}`);
  }
}

// 配置 Git Hooks
function setupGitHooks() {
  log('設置 Git hooks...');
  
  const gitHooksDir = path.join(CONFIG.projectRoot, '.git', 'hooks');
  const customHooksDir = path.join(CONFIG.projectRoot, '.github', 'hooks');
  
  // 檢查 .git 目錄是否存在
  if (!fs.existsSync(path.join(CONFIG.projectRoot, '.git'))) {
    log('未找到 .git 目錄，跳過 Git hooks 設置', 'WARNING');
    return;
  }
  
  // 檢查自定義 hooks 目錄是否存在
  if (!fs.existsSync(customHooksDir)) {
    log('未找到自定義 hooks 目錄，創建 .github/hooks 目錄');
    fs.mkdirSync(customHooksDir, { recursive: true });
  }
  
  // 創建 pre-commit hook
  const preCommitPath = path.join(gitHooksDir, 'pre-commit');
  const preCommitContent = `#!/bin/sh
# 自動生成的 pre-commit hook
if [ -f "$(dirname "$0")/../../.github/hooks/pre-commit" ]; then
  exec "$(dirname "$0")/../../.github/hooks/pre-commit" "$@"
fi
`;

  fs.writeFileSync(preCommitPath, preCommitContent);
  fs.chmodSync(preCommitPath, '755');
  
  // 創建自定義 pre-commit hook
  const customPreCommitPath = path.join(customHooksDir, 'pre-commit');
  if (!fs.existsSync(customPreCommitPath)) {
    const customPreCommitContent = `#!/bin/sh
# 項目自定義 pre-commit hook

# 執行 lint
echo "Running lint check..."
pnpm lint

# 檢查 lint 結果
if [ $? -ne 0 ]; then
  echo "❌ Lint 檢查失敗，請修復錯誤後再提交"
  exit 1
fi

# 執行測試
echo "Running tests..."
pnpm test

# 檢查測試結果
if [ $? -ne 0 ]; then
  echo "❌ 測試失敗，請修復失敗的測試後再提交"
  exit 1
fi

echo "✅ 前置檢查通過"
exit 0
`;
    fs.writeFileSync(customPreCommitPath, customPreCommitContent);
    fs.chmodSync(customPreCommitPath, '755');
  }
  
  log('Git hooks 設置完成');
}

// 設置開發環境
function setupDevEnvironment() {
  log('設置開發環境...');
  
  // 檢查和安裝項目依賴
  executeCommand('pnpm install');
  
  // 設置 .npmrc
  const npmrcPath = path.join(CONFIG.projectRoot, '.npmrc');
  if (!fs.existsSync(npmrcPath)) {
    log('創建 .npmrc 配置...');
    const npmrcContent = `save-exact=true
engine-strict=true
resolution-mode=highest
shamefully-hoist=true
`;
    fs.writeFileSync(npmrcPath, npmrcContent);
  }
  
  // 設置 .nvmrc
  const nvmrcPath = path.join(CONFIG.projectRoot, '.nvmrc');
  if (!fs.existsSync(nvmrcPath)) {
    log('創建 .nvmrc 配置...');
    fs.writeFileSync(nvmrcPath, CONFIG.requiredNodeVersion);
  }
}

// 主函數
function main() {
  log('開始設置 Node.js 環境...');
  
  // 檢查 Node.js 版本
  if (!checkVersion('node --version', /v(\d+\.\d+\.\d+)/, CONFIG.requiredNodeVersion)) {
    log(`請升級 Node.js 至 v${CONFIG.requiredNodeVersion} 或更高版本`, 'ERROR');
    process.exit(1);
  }
  
  // 檢查 pnpm 版本
  if (!checkVersion('pnpm --version', /(\d+\.\d+\.\d+)/, CONFIG.requiredPnpmVersion)) {
    log(`請升級 pnpm 至 v${CONFIG.requiredPnpmVersion} 或更高版本`, 'ERROR');
    process.exit(1);
  }
  
  // 安裝全局包
  installGlobalPackages();
  
  // 設置開發環境
  setupDevEnvironment();
  
  // 設置 Git Hooks
  if (CONFIG.configureGitHooks) {
    setupGitHooks();
  }
  
  log('Node.js 環境設置完成！');
}

// 執行主函數
main();
