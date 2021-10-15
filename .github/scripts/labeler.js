const { Octokit } = require("@octokit/core")
const fs = require('fs')

const args = process.argv.slice(2)
const ghKey = args.includes('--github-key') ? args[args.indexOf('--github-key') + 1] : false
const pullNumber = args.includes('--pull-number') ? args[args.indexOf('--pull-number') + 1] : 0
const owner = 'doka-guide'
const repo = 'content'

const setupLabels = async (ghKey, pullNumber) => {
  if (ghKey && pullNumber > 0) {
    const rawLabelPatterns = fs.readFileSync('.labeler.json')
    const labelPatterns = JSON.parse(rawLabelPatterns)

    const octokit = new Octokit({ auth: ghKey })

    const newLabels = ['эксперимент']

    const pullObject = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}', {
      owner,
      repo,
      pull_number: pullNumber
    })

    console.log(pullObject)

    const fileObjects = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/files', {
      owner,
      repo,
      pull_number: pullNumber
    })

    const files = {}

    for (const index in fileObjects) {
      if (Object.hasOwnProperty.call(fileObjects, index)) {
        const file = fileObjects[index]
        if (!Object.keys(files).includes(file.status)) {
          files[file.status] = []
        }
        files[file.status].push[file.filename]
      }
    }

    console.log(files)

    await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
      owner,
      repo,
      issue_number: pullNumber,
      labels: newLabels
    })
  }
}

setupLabels(ghKey, pullNumber)
