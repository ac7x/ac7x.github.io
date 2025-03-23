#!/usr/bin/env node

/**
 * 清理腳本
 * 
 * 此腳本用於清理專案中的各種快取和臨時文件，
 * 包括 Node.js 快取、pnpm store、構建輸出等
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 配置要清理的目錄和文件
const CLEANUP_TARGETS = [
  // 構建輸出
  '.next',
  'out',
  'dist',
  'build',
  
  // Node.js 相關
  'node_modules/.cache',
  '.eslintcache',
  
  // 日誌文件
  'logs',
  '*.log',
  'npm-debug.log*',
  'yarn-debug.log*',
  'yarn-error.log*',
  'pnpm-debug.log*',
  
  // 其他臨時文件
  '.DS_Store',
  'Thumbs.db',
  '.env.local',
  '.env.development.local',
  '.env.test.local',
  '.env.production.local'
];

// 記錄訊息
function log(message, type = 'INFO') {
  console.log(`[${type}] ${message}`);
}

// 執行命令並處理錯誤
function executeCommand(command) {
  try {
    log(`執行命令: ${command}`);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    log(`命令失敗: ${error.message}`, 'ERROR');
    return false;
  }
}

// 刪除指定路徑
function removePath(targetPath) {
  try {
    if (fs.existsSync(targetPath)) {
      const stats = fs.statSync(targetPath);
      
      if (stats.isDirectory()) {
        log(`刪除目錄: ${targetPath}`);
        fs.rmSync(targetPath, { recursive: true, force: true });
      } else {
        log(`刪除文件: ${targetPath}`);
        fs.unlinkSync(targetPath);
      }
      
      return true;
    }
    return false;
  } catch (error) {
    log(`刪除失敗: ${targetPath} - ${error.message}`, 'ERROR');
    return false;
  }
}

// 清理 pnpm store
function cleanPnpmStore() {
  log('清理 pnpm store...');
  
  // 執行 pnpm store prune 命令清理未使用的包
  executeCommand('pnpm store prune');
  
  log('pnpm store 清理完成');
}

// 主函數
function main() {
  log('開始清理操作...');
  
  // 清理指定的目錄和文件
  const rootDir = path.resolve(__dirname, '..');
  let cleanedCount = 0;
  
  for (const target of CLEANUP_TARGETS) {
    // 處理通配符
    if (target.includes('*')) {
      // 這是簡化的實現，實際上可能需要更複雜的 glob 匹配
      const pattern = target.replace(/\*/g, '');
      const files = fs.readdirSync(rootDir)
        .filter(file => file.includes(pattern))
        .map(file => path.join(rootDir, file));
      
      for (const file of files) {
        if (removePath(file)) {
          cleanedCount++;
        }
      }
    } else {
      const fullPath = path.join(rootDir, target);
      if (removePath(fullPath)) {
        cleanedCount++;
      }
    }
  }
  
  // 清理 pnpm store
  cleanPnpmStore();
  
  // 執行額外的清理命令
  executeCommand('pnpm run build:clean');
  
  log(`清理操作完成，共清理 ${cleanedCount} 個目標`);
}

// 執行主函數
main();
