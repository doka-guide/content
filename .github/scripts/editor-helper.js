const { Octokit } = require("@octokit/core")
const fs = require('fs')

const args = process.argv.slice(2)
const ghKey = args.includes('--github-key') ? args[args.indexOf('--github-key') + 1] : false

const issueHeaderText = `## Список файлов для редактирования:

`

const issueNumberToChapter = {
  css: 1826,
  html: 1825,
  js: 1824,
  tools: 1823,
  a11y: 3956,
}

const issueLists = {
  css: [],
  html: [],
  js: [],
  tools: [],
  a11y: [],
}

const printItem = (fileName, title, isChecked, isPlaceholder) => {
  return `- [${isChecked ? 'x' : ' '}] [${title}](https://github.com/doka-guide/content/tree/main/${fileName.replace('/index.md', '')}) ${isPlaceholder ? '✎' : ''}
`}

if (ghKey) {
  const rawMeta = fs.readFileSync('result.json')
  const commonMeta = JSON.parse(rawMeta)
  for (const fileName in commonMeta) {
    const meta = commonMeta[fileName]
    const metaKeys = Object.keys(meta)
    for (const chapter in issueLists) {
      if (fileName.indexOf(chapter) == 0) {
        const item = printItem(fileName, meta.title, metaKeys.includes('editors'), meta.tags ? meta.tags.includes('placeholder') : false)
        issueLists[chapter].push(item)
      }
    }
  }

  const octokit = new Octokit({ auth: ghKey })
  for (const chapter in issueNumberToChapter) {
    octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
      owner: 'doka-guide',
      repo: 'content',
      issue_number: issueNumberToChapter[chapter],
      body: `${issueHeaderText}${issueLists[chapter].join('')}`
    })
  }
}
