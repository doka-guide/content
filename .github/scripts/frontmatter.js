const fs = require('fs');

const rawMeta = fs.readFileSync('meta.json');

const metaFromMeta = JSON.parse(rawMeta);

console.log(metaFromMeta);
