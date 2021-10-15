const { Octokit } = require("@octokit/core")
const fs = require('fs')

const args = process.argv.slice(2)
const ghKey = args.includes('--github-key') ? args[args.indexOf('--github-key') + 1] : false
const pullNumber = args.includes('--pull-number') ? args[args.indexOf('--pull-number') + 1] : 0
const owner = 'doka-guide'
const repo = 'content'

const selectLabels = (selectedFiles, selectedRules) => {
  const output = []
  console.log(selectedRules)
  for (const labelIndex in selectedRules) {
    if (Object.hasOwnProperty.call(selectedRules, labelIndex)) {
      const label = selectedRules[labelIndex]
      const labelRules = selectedRules[label]
      console.log(labelRules)
      for (const statusIndex in labelRules) {
        if (Object.hasOwnProperty.call(labelRules, statusIndex)) {
          const status = labelRules[statusIndex]
          const statusRules = labelRules[status]
          console.log(statusRules)
          statusRules.forEach(pattern => {
            if (Object.keys(selectedFiles).includes(status)) {
              const regExp = new RegExp(pattern, 'i')
              selectedFiles[status].forEach(file => {
                if (regExp.test(file) && output.indexOf(label) < 0) {
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

    const fileLabelRules = Object.keys(labelRules.files)
    const fileSelectedLabels = selectLabels(files, fileLabelRules)
    newLabels.push(...fileSelectedLabels)

    const assigneeLabelRules = Object.keys(labelRules.assignee)
    const metaLabelRules = Object.keys(labelRules.meta)

    await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
      owner,
      repo,
      issue_number: pullNumber,
      labels: newLabels.concat(oldLabels)
    })
  }
}

setupLabels(ghKey, pullNumber)
