const fs = require('fs');
const path = require('path');
const { RuleSuggestionEngine } = require('./suggestion');

class RuleAdaptationSystem {
  constructor() {
    this.suggestionEngine = new RuleSuggestionEngine();
    this.rulesDir = path.join(__dirname, '../../core/rules');
  }

  // 自動生成規則調整建議
  async generateAdaptationReport() {
    const suggestions = this.suggestionEngine.generateSuggestions();
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalSuggestions: suggestions.length,
        highPriority: suggestions.filter(s => s.priority === 'high').length,
        mediumPriority: suggestions.filter(s => s.priority === 'medium').length,
        lowPriority: suggestions.filter(s => s.priority === 'low').length,
      },
      improvementSuggestions: suggestions.filter(s => s.type === 'rule_improvement'),
      newRuleSuggestions: suggestions.filter(s => s.type === 'new_rule')
    };
    
    // 保存報告
    const reportDir = path.join(__dirname, '../reports');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }
    
    const reportPath = path.join(reportDir, `adaptation-${report.timestamp.slice(0, 10)}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    return {
      reportPath,
      report
    };
  }

  // 自動套用高優先級的規則調整
  async applyHighPriorityAdaptations() {
    const { report } = await this.generateAdaptationReport();
    const changes = [];
    
    // 處理高優先級改進建議
    for (const suggestion of report.improvementSuggestions.filter(s => s.priority === 'high')) {
      // 找到相關規則檔案
      const files = fs.readdirSync(this.rulesDir).filter(f => f.endsWith('.json'));
      let ruleFile, ruleFramework, ruleContent, ruleIndex;
      
      // 在所有規則文件中查找特定規則
      for (const file of files) {
        const filePath = path.join(this.rulesDir, file);
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        const index = content.rules.findIndex(r => r.id === suggestion.ruleId);
        if (index !== -1) {
          ruleFile = filePath;
          ruleFramework = file.replace('.json', '');
          ruleContent = content;
          ruleIndex = index;
          break;
        }
      }
      
      if (!ruleFile) continue;
      
      // 根據建議修改規則
      const rule = ruleContent.rules[ruleIndex];
      
      // 範例：如果規則經常被違反，且收到負面反饋，可能需要降低嚴重性
      if (rule.errorLevel === 'error' && suggestion.reason === '高違規率') {
        rule.errorLevel = 'warning';
        changes.push({
          file: ruleFile,
          ruleId: rule.id,
          change: `errorLevel: error -> warning`,
          reason: '根據高違規率和用戶反饋降低嚴重性'
        });
      }
      
      // 如果一個規則缺少範例，添加示例
      if (!rule.examples && suggestion.suggestion.includes('添加更多示例')) {
        // 這裡需要從某個地方獲取示例
        // 在實際系統中，可能從分析的代碼模式中提取
      }
      
      // 保存更新後的規則
      fs.writeFileSync(ruleFile, JSON.stringify(ruleContent, null, 2));
    }
    
    // 添加新規則
    for (const suggestion of report.newRuleSuggestions.filter(s => s.priority === 'high')) {
      const targetFile = path.join(this.rulesDir, `${suggestion.framework}.json`);
      
      if (fs.existsSync(targetFile)) {
        const fileContent = JSON.parse(fs.readFileSync(targetFile, 'utf8'));
        
        // 創建新規則
        const newRule = {
          id: suggestion.implementation.id,
          pattern: suggestion.pattern,
          errorLevel: suggestion.implementation.errorLevel,
          message: suggestion.implementation.message
        };
        
        fileContent.rules.push(newRule);
        fs.writeFileSync(targetFile, JSON.stringify(fileContent, null, 2));
        
        changes.push({
          file: targetFile,
          ruleId: newRule.id,
          change: `added new rule`,
          reason: suggestion.reason
        });
      }
    }
    
    return {
      changesApplied: changes.length,
      details: changes
    };
  }
}

module.exports = {
  RuleAdaptationSystem
};