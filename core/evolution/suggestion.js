const { RuleUsageTracker } = require('../analytics/usage_metrics');
const fs = require('fs');
const path = require('path');

class RuleSuggestionEngine {
  constructor() {
    this.usageTracker = new RuleUsageTracker();
    this.feedbackPath = path.join(__dirname, '../data/feedback.json');
    this.ensureFeedbackFile();
  }

  ensureFeedbackFile() {
    const dir = path.dirname(this.feedbackPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(this.feedbackPath)) {
      fs.writeFileSync(this.feedbackPath, JSON.stringify([]));
    }
  }

  loadFeedback() {
    try {
      return JSON.parse(fs.readFileSync(this.feedbackPath, 'utf8'));
    } catch (err) {
      console.error('無法載入反饋資料:', err);
      return [];
    }
  }

  // 生成規則建議
  generateSuggestions() {
    const suggestions = [];
    
    // 1. 分析常見違規模式
    const topViolatedRules = this.usageTracker.getTopViolatedRules();
    
    // 2. 分析用戶反饋
    const feedback = this.loadFeedback();
    const negativeRules = this.analyzeNegativeFeedback(feedback);
    
    // 3. 針對高違規率規則提出改進建議
    topViolatedRules.forEach(rule => {
      const isNegative = negativeRules.some(r => r.ruleId === rule.id);
      
      if (rule.violationCount > 100) {
        // 高違規率可能意味著規則太嚴格或用戶不了解
        suggestions.push({
          type: 'rule_improvement',
          ruleId: rule.id,
          reason: '高違規率',
          suggestion: isNegative 
            ? '考慮放寬規則，並提供更詳細的文檔和例子'
            : '添加更多示例和自動修復選項',
          violationCount: rule.violationCount,
          priority: isNegative ? 'high' : 'medium'
        });
      }
    });
    
    // 4. 識別潛在的新規則機會
    const potentialNewRules = this.identifyPotentialNewRules();
    potentialNewRules.forEach(rule => {
      suggestions.push({
        type: 'new_rule',
        pattern: rule.pattern,
        reason: rule.reason,
        framework: rule.framework,
        suggestedImplementation: rule.implementation,
        priority: rule.priority
      });
    });
    
    return suggestions;
  }

  analyzeNegativeFeedback(feedback) {
    // 找出多次收到負面反饋的規則
    const ruleComplaints = {};
    
    feedback
      .filter(item => item.feedbackType === 'negative')
      .forEach(item => {
        ruleComplaints[item.ruleId] = (ruleComplaints[item.ruleId] || 0) + 1;
      });
    
    return Object.entries(ruleComplaints)
      .filter(([_, count]) => count >= 3) // 至少3條負面反饋
      .map(([ruleId, count]) => ({ ruleId, count }));
  }

  identifyPotentialNewRules() {
    // 這裡可以實現更複雜的分析，例如:
    // - 分析代碼庫中常見的反模式
    // - 根據新的框架版本更新識別需要新規則的地方
    // - 從社群中收集常見問題

    // 簡單示例
    return [
      {
        pattern: "useState\\(\\)\\s*\\[\\s*(?!setState)",
        reason: "useState 解構命名應遵循 [state, setState] 慣例",
        framework: "nextjs",
        implementation: {
          id: "useState-naming-convention",
          errorLevel: "warning",
          message: "useState 解構應遵循 [state, setState] 命名慣例"
        },
        priority: "medium"
      }
    ];
  }
}

module.exports = {
  RuleSuggestionEngine
};