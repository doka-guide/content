const fs = require('fs');

const rawdata = fs.readFileSync('../../result.json');
const metaFromFiles = JSON.parse(rawdata);
console.log(metaFromFiles);
