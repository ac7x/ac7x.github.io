const { RuleAdaptationSystem } = require('../evolution/adaptation');

async function main() {
  console.log('開始生成規則適應性報告...');
  const adaptationSystem = new RuleAdaptationSystem();
  
  try {
    const { reportPath, report } = await adaptationSystem.generateAdaptationReport();
    
    console.log(`✅ 報告已生成: ${reportPath}`);
    console.log(`總建議數: ${report.summary.totalSuggestions}`);
    console.log(`高優先級: ${report.summary.highPriority}`);
    console.log(`中優先級: ${report.summary.mediumPriority}`);
    console.log(`低優先級: ${report.summary.lowPriority}`);
  } catch (error) {
    console.error('生成報告時出錯:', error);
    process.exit(1);
  }
}

main();