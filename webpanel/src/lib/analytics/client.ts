// 客戶端版本的 RuleUsageTracker

// 模擬統計資料，實際環境中應該從 API 獲取
export class RuleUsageTracker {
  static async getUsageStats() {
    // 在實際環境中，這裡應該從 API 獲取數據
    // 例如: const response = await fetch('/api/analytics/usage');
    
    // 模擬資料（開發/演示用）
    return {
      // 統計數字
      totalViolations: 325,
      violationChange: 5,
      feedbackCount: 28,
      feedbackChange: -12,
      suggestionCount: 8,
      
      // 違規最多的規則
      topViolatedRules: [
        { id: 'no-client-hooks', framework: 'server', violationCount: 87, trend: 12 },
        { id: 'require-select', framework: 'prisma', violationCount: 64, trend: -8 },
        { id: 'no-eval', framework: 'security', violationCount: 43, trend: 0 },
        { id: 'response-dto-format', framework: 'architecture', violationCount: 36, trend: 15 },
        { id: 'direct-prisma-call', framework: 'server', violationCount: 24, trend: -5 }
      ],
      
      // 最近反饋
      recentFeedback: [
        { 
          ruleId: 'no-client-hooks', 
          comment: '這個規則很有用，但錯誤訊息可以更清楚',
          feedbackType: 'suggestion',
          timestamp: '2023-12-02T15:48:00.000Z'
        },
        { 
          ruleId: 'require-select', 
          comment: '這個檢查幫我發現了很多潛在的效能問題',
          feedbackType: 'positive',
          timestamp: '2023-12-01T09:24:00.000Z'
        },
        { 
          ruleId: 'direct-prisma-call', 
          comment: '在某些情況下這個規則太嚴格了',
          feedbackType: 'negative',
          timestamp: '2023-11-30T14:18:00.000Z'
        }
      ],
      
      // 改進建議
      improvementSuggestions: [
        {
          type: 'rule_improvement',
          ruleId: 'no-client-hooks',
          reason: '高違規率',
          suggestion: '改進錯誤訊息，提供更明確的修復指導',
          priority: 'high'
        },
        {
          type: 'new_rule',
          reason: 'useState 解構命名應遵循一致慣例',
          suggestion: '添加檢查確保 useState 解構符合 [state, setState] 命名模式',
          priority: 'medium'
        },
        {
          type: 'rule_improvement',
          ruleId: 'csrf-header-check',
          reason: '高誤報率',
          suggestion: '優化檢測邏輯，排除特定情境下的誤報',
          priority: 'medium'
        }
      ]
    };
  }
}