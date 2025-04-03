const crypto = require('crypto');
const fs = require('fs');

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const files = ['nextjs/server-rules.json', 'shared/prisma-rules.json'];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const signature = fs.readFileSync(`${file}.sig`, 'utf-8');
  const verifier = crypto.createVerify('RSA-SHA256');
  verifier.update(content);
  if (!verifier.verify(PUBLIC_KEY, signature, 'base64')) {
    throw new Error(`❌ 簽章驗證失敗: ${file}`);
  }
});