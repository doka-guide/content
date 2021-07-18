const fs = require('fs');

const rawMeta = fs.readFileSync('result.json');

const commonMeta = JSON.parse(rawMeta);

for (const fileName in commonMeta) {
  const fileMeta = commonMeta[fileName]
  if (fileMeta.hasOwnProperty('title')
    && fileMeta.hasOwnProperty('tags')
    && fileMeta.hasOwnProperty('authors')
    && fileMeta.hasOwnProperty('contributors')
    && fileMeta.hasOwnProperty('summary')
  ) {
    console.log(`В файле '${fileName}' есть все необходимые поля`)
  }

  const metaKeys = Object.keys(fileMeta)
  for (let i = 0; i < metaKeys.length; i++) {
    switch (metaKeys[i]) {
      case 'title':
        if (i !== 0) {
          console.error(`Field 'title' is not in right place!`);
        }
      case 'tags':
        if (i !== 1) {
          console.error(`Field 'tags' is not in right place!`);
        }
      case 'authors':
        if (i !== 2) {
          console.error(`Field 'authors' is not in right place!`);
        }
      case 'contributors':
        if (i !== 3) {
          console.error(`Field 'contributors' is not in right place!`);
        }
      case 'summary':
        if (i !== 4) {
          console.error(`Field 'summary' is not in right place!`);
        }
    }
  }
  console.log(`В файле '${fileName}' все поля в правильном порядке`)
}
