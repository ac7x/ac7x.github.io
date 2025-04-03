export interface Framework {
  id: string;
  name: string;
  version: string;
  rulesCount: number;
  description: string;
}

export const frameworks: Framework[] = [
  {
    id: 'nextjs',
    name: 'Next.js',
    version: '14.1.0',
    rulesCount: 32,
    description: 'React 框架的提示詞和規則集',
  },
  {
    id: 'prisma',
    name: 'Prisma',
    version: '5.3.1',
    rulesCount: 14,
    description: 'Prisma ORM 的資料庫交互規則集',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    version: '5.1.3',
    rulesCount: 28,
    description: '強型別檢查的 TypeScript 規則',
  },
  {
    id: 'reactnative',
    name: 'React Native',
    version: '0.73.0',
    rulesCount: 18,
    description: '行動應用開發框架規則集',
  }
];

export interface Rule {
  id: string;
  pattern: string;
  errorLevel: 'info' | 'warning' | 'error' | 'block';
  message: string;
  framework: string;
  documentation?: string;
  hasAutoFix: boolean;
}