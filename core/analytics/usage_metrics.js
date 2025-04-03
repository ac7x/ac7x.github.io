const fs = require('fs');
const path = require('path');

// 規則使用統計
class RuleUsageTracker {
  constructor(dataPath = path.join(__dirname, '../data/usage.json')) {
    this.dataPath = dataPath;
    this.ensureDataFile();
    this.metrics = this.loadMetrics();
  }

  ensureDataFile() {
    const dir = path.dirname(this.dataPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(this.dataPath)) {
      fs.writeFileSync(this.dataPath, JSON.stringify({ rules: {}, patterns: {} }));
    }
  }

  loadMetrics() {
    try {
      return JSON.parse(fs.readFileSync(this.dataPath, 'utf8'));
    } catch (err) {
      console.error('無法載入使用指標:', err);
      return { rules: {}, patterns: {} };
    }
  }

  trackRuleViolation(ruleId, framework, fileType) {
    if (!this.metrics.rules[ruleId]) {
      this.metrics.rules[ruleId] = {
        violationCount: 0,
        byFramework: {},
        byFileType: {}
      };
    }
    
    const rule = this.metrics.rules[ruleId];
    rule.violationCount++;
    
    if (framework) {
      rule.byFramework[framework] = (rule.byFramework[framework] || 0) + 1;
    }
    
    if (fileType) {
      rule.byFileType[fileType] = (rule.byFileType[fileType] || 0) + 1;
    }
    
    this.saveMetrics();
  }

  trackPatternOccurrence(patternId, context) {
    if (!this.metrics.patterns[patternId]) {
      this.metrics.patterns[patternId] = {
        occurrenceCount: 0,
        contexts: []
      };
    }
    
    const pattern = this.metrics.patterns[patternId];
    pattern.occurrenceCount++;
    
    if (context) {
      // 最多保存100個上下文樣本
      if (pattern.contexts.length < 100) {
        pattern.contexts.push(context);
      }
    }
    
    this.saveMetrics();
  }

  getTopViolatedRules(limit = 10) {
    const rules = Object.entries(this.metrics.rules)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.violationCount - a.violationCount);
    
    return rules.slice(0, limit);
  }

  getFrameworkSpecificTrends() {
    const frameworkTrends = {};
    
    Object.entries(this.metrics.rules).forEach(([ruleId, data]) => {
      Object.entries(data.byFramework || {}).forEach(([framework, count]) => {
        if (!frameworkTrends[framework]) {
          frameworkTrends[framework] = { totalViolations: 0, topRules: {} };
        }
        
        frameworkTrends[framework].totalViolations += count;
        frameworkTrends[framework].topRules[ruleId] = count;
      });
    });
    
    // 每個框架選出前5個規則
    Object.keys(frameworkTrends).forEach(framework => {
      const topRules = Object.entries(frameworkTrends[framework].topRules)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .reduce((obj, [rule, count]) => {
          obj[rule] = count;
          return obj;
        }, {});
      
      frameworkTrends[framework].topRules = topRules;
    });
    
    return frameworkTrends;
  }

  saveMetrics() {
    try {
      fs.writeFileSync(this.dataPath, JSON.stringify(this.metrics, null, 2));
    } catch (err) {
      console.error('無法保存使用指標:', err);
    }
  }
}

module.exports = {
  RuleUsageTracker
};