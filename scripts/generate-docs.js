const fs = require('fs');
const path = require('path');

const rules = require('../nextjs/server-rules.json');
const mdContent = `
# Next.js Server Rules

| 規則ID | 錯誤等級 | 自動修復 |
|--------|----------|----------|
${rules.rules.map(rule => `| ${rule.id} | ${rule.errorLevel} | ${!!rule.autoFix}`).join('\n')}
`;

fs.writeFileSync(path.join(__dirname, '../docs/server-rules.md'), mdContent);