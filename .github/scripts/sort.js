const path = require('path')
const fs = require('fs')
const SPELLER_PATH = path.resolve(__dirname, '../../.yaspeller.json')

const json = require(SPELLER_PATH)
json.dictionary.sort((a, b) => a.localeCompare(b))

fs.writeFileSync(SPELLER_PATH, JSON.stringify(json, null, 2) + '\n')
