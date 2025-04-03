const crypto = require('crypto');
const fs = require('fs');

const PRIVATE_KEY = process.env.SIGNING_KEY;
const FILES_TO_SIGN = [
  'nextjs/server-rules.json',
  'shared/prisma-rules.json'
];

function signFile(content) {
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(content);
  return signer.sign(PRIVATE_KEY, 'base64');
}

FILES_TO_SIGN.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const signature = signFile(content);
  fs.writeFileSync(`${file}.sig`, signature);
});