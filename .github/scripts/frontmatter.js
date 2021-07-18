const fs = require('fs');

const rawHtml = fs.readFileSync('html.json');
const rawCss = fs.readFileSync('css.json');
const rawJs = fs.readFileSync('js.json');
const rawTools = fs.readFileSync('tools.json');

const metaFromHtml = JSON.parse(rawHtml);
const metaFromCss = JSON.parse(rawCss);
const metaFromJs = JSON.parse(rawJs);
const metaFromTools = JSON.parse(rawTools);

const commonMeta = Object.assign(metaFromCss, metaFromHtml, metaFromJs, metaFromTools);

for (const fileMeta in commonMeta) {
  console.log(`${commonMeta[fileMeta].title}`);
}
