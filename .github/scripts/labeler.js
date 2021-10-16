const { Octokit } = require("@octokit/core")
const fs = require('fs')

const args = process.argv.slice(2)
const ghKey = args.includes('--github-key') ? args[args.indexOf('--github-key') + 1] : false
const pullNumber = args.includes('--pull-number') ? args[args.indexOf('--pull-number') + 1] : 0
const owner = 'doka-guide'
const repo = 'content'

const selectLabels = (selectedFiles, selectedRules) => {
  const output = []
  for (const label in selectedRules) {
    if (Object.hasOwnProperty.call(selectedRules, label)) {
      const labelRules = selectedRules[label]
      for (const status in labelRules) {
        if (Object.hasOwnProperty.call(labelRules, status)) {
          const statusRules = labelRules[status]
          statusRules.forEach(pattern => {
            if (Object.keys(selectedFiles).includes(status)) {
              const regExp = new RegExp(pattern, 'i')
              console.log(status)
              selectedFiles[status].forEach(file => {
                const isValid = regExp.test(file)
                const isNotInList = output.indexOf(label) < 0
                console.log(isValid, isNotInList)
                if (isValid && isNotInList) {
                  output.push(label)
                }
              })
            }
          })
        }
      }
    }
  }
  return output
}

const setupLabels = async (ghKey, pullNumber) => {
  if (ghKey && pullNumber > 0) {
    const rawLabelRules = fs.readFileSync('.labeler.json')
    const labelRules = JSON.parse(rawLabelRules)

    const octokit = new Octokit({ auth: ghKey })

    const pullObject = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}', {
      owner,
      repo,
      pull_number: pullNumber
    })

    const newLabels = []
    const oldLabels = []
    for (const index in pullObject.data.labels) {
      const labelObject = pullObject.data.labels[index]
      oldLabels.push(labelObject.name)
    }

    const fileObjects = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/files', {
      owner,
      repo,
      pull_number: pullNumber
    })

    const files = {
      added: [],
      modified: [],
      removed: []
    }

    for (const index in fileObjects.data) {
      const file = fileObjects.data[index]
      files[file.status].push(file.filename)
    }

    const fileSelectedLabels = selectLabels(files, labelRules.files)
    console.log(`По фильтру для файлов установлены следующие лейблы: ${fileSelectedLabels}`)
    newLabels.push(...fileSelectedLabels)

    const assigneeLabelRules = Object.keys(labelRules.assignee)
    const metaLabelRules = Object.keys(labelRules.meta)

    await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
      owner,
      repo,
      issue_number: pullNumber,
      labels: newLabels
    })
  }
}

setupLabels(ghKey, pullNumber)
