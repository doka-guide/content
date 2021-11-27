const { Octokit } = require("@octokit/core")
const fm = require('front-matter')
const fs = require('fs')

const args = process.argv.slice(2)
const ghKey = args.includes('--github-key') ? args[args.indexOf('--github-key') + 1] : false
const pullNumber = args.includes('--pull-number') ? args[args.indexOf('--pull-number') + 1] : 0
const owner = 'doka-guide'
const repo = 'content'

const selectLabels = (selectedFiles, selectedRules) => {
  const output = new Set([])
  for (const label in selectedRules) {
    if (Object.hasOwnProperty.call(selectedRules, label)) {
      const labelRules = selectedRules[label]
      for (const status in labelRules) {
        const statusRules = labelRules[status]
        statusRules.forEach(filePattern => {
          if (Object.keys(selectedFiles).includes(status)) {
            const regExp = new RegExp(filePattern, 'i')
            selectedFiles[status].forEach(fileName => {
              const isValid = regExp.test(fileName)
              const isNotInList = !output.has(label)
              if (isValid && isNotInList) {
                output.add(label)
              }
            })
          }
        })
      }
    }
  }
  return output
}

const setupLabels = async (ghKey, pullNumber) => {
  if (ghKey && pullNumber > 0) {
    const rawLabelRules = fs.readFileSync('.github/labeler.json')
    const labelRules = JSON.parse(rawLabelRules)

    const octokit = new Octokit({ auth: ghKey })

    const pullObject = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}', {
      owner,
      repo,
      pull_number: pullNumber
    })

    const labels = new Set([])
    for (const index in pullObject.data.labels) {
      const labelObject = pullObject.data.labels[index]
      labels.add(labelObject.name)
    }

    const fileObjects = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/files', {
      owner,
      repo,
      pull_number: pullNumber
    })

    const files = {
      added: [],
      modified: [],
      removed: [],
      renamed: []
    }

    console.log('Файлы:')
    for (const index in fileObjects.data) {
      const file = fileObjects.data[index]
      if (typeof file === 'object' && file.status && file.filename) {
        console.log(file.filename, file.status)
        files[file.status].push(file.filename)
        if (Object.keys(labelRules).includes('meta') && (new RegExp('.+.md', 'i')).test(file.filename)) {
          const content = fs.readFileSync(file.filename, { encoding: 'utf8', flag: 'r' })
          const contentMeta = fm(content)
          for (const field in labelRules.meta) {
            if (Object.hasOwnProperty.call(labelRules.meta, field)) {
              const fieldRules = labelRules.meta[field]
              if (Object.keys(contentMeta).includes(field)) {
                const metaSelectedLabels = selectLabels([file.filename], fieldRules.files)
                metaSelectedLabels.forEach(element => {
                  labels.add(element)
                })
              }
            }
          }
        }
      }
    }

    const selectedFileLabels = selectLabels(files, labelRules.files)
    selectedFileLabels.forEach(element => {
      labels.add(element)
    })

    if (Object.keys(pullObject).includes('assignee')) {
      pullObject.assignee.forEach(person => {
        if (Object.keys(labelRules.assignee).includes(person)) {
          const assigneeSelectedLabel = selectLabels(files, labelRules.assignee[person])
          assigneeSelectedLabel.forEach(element => {
            labels.add(element)
          })
        }
      })
    }

    const oldLabelsObject = await octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}/labels', {
      owner,
      repo,
      issue_number: pullNumber,
    })
    for (const key in oldLabelsObject) {
      if (oldLabelsObject[key].hasOwnProperty('name') && !labels.has(oldLabelsObject[key].name)) {
        labels.add(oldLabelsObject[key].name)
      }
    }
    await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
      owner,
      repo,
      issue_number: pullNumber,
      labels: [...labels]
    })
  }
}

setupLabels(ghKey, pullNumber)
