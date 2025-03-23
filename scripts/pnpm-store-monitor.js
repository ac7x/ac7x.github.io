#!/usr/bin/env node

/**
 * pnpm 存儲監控腳本
 * 
 * 此腳本用於監控 pnpm store 的大小和健康狀況，
 * 當 store 達到指定大小或發現問題時發出警告
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 配置
const CONFIG = {
  maxStoreSizeGB: 2,
  warningThresholdGB: 1.5,
  storePathRelative: '.pnpm-store',
  logFile: path.join(__dirname, '../logs/pnpm-monitor.log')
};

// 確保日誌目錄存在
const logDir = path.dirname(CONFIG.logFile);
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// 記錄日誌
function log(message, type = 'INFO') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${type}] ${message}`;
  
  console.log(logMessage);
  fs.appendFileSync(CONFIG.logFile, logMessage + '\n');
}

// 獲取目錄大小（以位元組為單位）
function getDirSize(dirPath) {
  try {
    const output = execSync(`du -sb "${dirPath}" | cut -f1`, { encoding: 'utf-8' });
    return parseInt(output.trim(), 10);
  } catch (error) {
    log(`無法獲取目錄大小: ${error.message}`, 'ERROR');
    return 0;
  }
}

// 檢查 store 健康狀況
function checkStoreHealth() {
  try {
    execSync('pnpm store status', { encoding: 'utf-8' });
    return true;
  } catch (error) {
    log(`pnpm store 健康檢查失敗: ${error.message}`, 'ERROR');
    return false;
  }
}

// 主函數
function main() {
  log('開始 pnpm store 監控');

  // 檢查 store 路徑
  const storePath = path.resolve(process.env.HOME || process.env.USERPROFILE, CONFIG.storePathRelative);
  if (!fs.existsSync(storePath)) {
    log(`pnpm store 不存在於路徑: ${storePath}`, 'WARNING');
    return;
  }

  // 獲取 store 大小
  const storeSizeBytes = getDirSize(storePath);
  const storeSizeGB = storeSizeBytes / (1024 * 1024 * 1024);
  
  log(`pnpm store 大小: ${storeSizeGB.toFixed(2)} GB`);

  // 檢查大小是否超過警告閾值
  if (storeSizeGB >= CONFIG.warningThresholdGB) {
    log(`pnpm store 大小接近配置的最大值 (${storeSizeGB.toFixed(2)}GB/${CONFIG.maxStoreSizeGB}GB)`, 'WARNING');
  }

  // 檢查大小是否超過最大值
  if (storeSizeGB >= CONFIG.maxStoreSizeGB) {
    log(`pnpm store 大小已超過配置的最大值! 建議執行清理`, 'ALERT');
    log(`可以執行 'node scripts/cleanup.js' 進行清理`, 'ALERT');
  }

  // 檢查 store 健康狀況
  if (!checkStoreHealth()) {
    log('建議執行 pnpm store prune 來修復 store', 'ALERT');
  }

  log('pnpm store 監控完成');
}

// 執行主函數
main();
