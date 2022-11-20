const { Octokit } = require("@octokit/core")
const fs = require('fs')

const args = process.argv.slice(2)
const ghKey = args.includes('--github-key') ? args[args.indexOf('--github-key') + 1] : false

const issueHeaderText = `## Список статей без дескрипшена:

`

const issueNumberToChapter = {
  css: 3009,
  html: 3008,
  js: 3010,
  tools: 3011,
  a11y: 3955,
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
        const hasDescription = metaKeys.includes('description') && metaKeys['description'] !== ""
        const item = printItem(fileName, meta.title, hasDescription, meta.tags ? meta.tags.includes('placeholder') : false)
        if (!hasDescription) {
          issueLists[chapter].push(item)
        }
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
