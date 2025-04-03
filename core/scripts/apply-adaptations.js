const { RuleAdaptationSystem } = require('../evolution/adaptation');

async function main() {
  console.log('開始應用高優先級規則適應...');
  const adaptationSystem = new RuleAdaptationSystem();
  
  try {
    const result = await adaptationSystem.applyHighPriorityAdaptations();
    
    console.log(`✅ 已應用 ${result.changesApplied} 個變更`);
    
    if (result.details.length > 0) {
      console.log('\n變更詳情:');
      result.details.forEach((change, i) => {
        console.log(`${i + 1}. ${change.file} - ${change.ruleId}: ${change.change}`);
        console.log(`   原因: ${change.reason}`);
      });
    }
  } catch (error) {
    console.error('應用適應性變更時出錯:', error);
    process.exit(1);
  }
}

main();