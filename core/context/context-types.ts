export interface ContextPattern {
  id: string;
  name: string;
  description: string;
  applicableRules: string[]; // 可應用的規則 IDs
  examples: {
    problematic: string;
    improved: string;
  }[];
  framework: string;
  tags: string[];
  frequency: number; // 出現頻率
}

export interface Solution {
  id: string;
  problemId: string; // 關聯的問題
  description: string;
  implementationSteps: string[];
  codeExample: string;
  effectivenessScore: number; // 0-100 評分
  frameworks: string[];
}

export interface UserFeedback {
  id: string;
  ruleId: string;
  feedbackType: 'positive' | 'negative' | 'suggestion';
  comment: string;
  suggestedImprovement?: string;
  timestamp: string;
  context?: string; // 發生的代碼上下文
}