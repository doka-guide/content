const fs = require('fs');

const rawMeta = fs.readFileSync('result.json');

const commonMeta = JSON.parse(rawMeta);

for (const fileMeta in commonMeta) {
  console.log(`${commonMeta[fileMeta].title}`);
}
