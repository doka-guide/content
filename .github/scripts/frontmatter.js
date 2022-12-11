const fs = require('fs')

const args = process.argv.slice(2)
const isNeedToFix = args.includes('--fix')

const outputJson = {}

const isFieldOrderValid = (fileName, field, index, order) => {
  if (index > order) {
    console.error(`Поле ${field} в файле '${fileName}' не на своём месте и будет перемещено ниже.`)
    return false
  } else if (index < order) {
    console.error(`Поле ${field} в файле '${fileName}' не на своём месте и будет перемещено выше.`)
    return false
  }
  return true
}

const isRequireFieldExists = (fileName, fileMeta, field) => {
  if (!fileMeta.hasOwnProperty(field)) {
    console.error(`В файле '${fileName}' нет необходимого поля ${field}`)
    return false
  }
  return true
}

const processIndexFile = (commonMeta, fileName) => {
  if (commonMeta.hasOwnProperty(fileName)) {
    delete commonMeta[fileName]
  }
}

const loadCheckModules = async (specialCheck) => {
  const output = {}
  for (const moduleKey of Object.keys(specialCheck)) {
    output[moduleKey] = await import(specialCheck[moduleKey])
  }
  return output
}


(async () => {
  const rawMeta = fs.readFileSync('result.json')
  const settings = fs.readFileSync('.github/frontmatter.json')

  const commonMeta = JSON.parse(rawMeta)

  processIndexFile(commonMeta, 'css/index.md')
  processIndexFile(commonMeta, 'html/index.md')
  processIndexFile(commonMeta, 'js/index.md')
  processIndexFile(commonMeta, 'tools/index.md')

  const { requireField, requireOrder, specialCheck } = JSON.parse(settings)
  let errorRequiredFieldsCounter = 0
  let errorOrderFieldsCounter = 0
  let errorNonValidFieldsCounter = 0
  let errorSpecialCheckCounter = 0

  let specialCheckFunctions = await loadCheckModules(specialCheck)

  if (requireField.length <= requireOrder.length) {
    for (const fileName in commonMeta) {
      let isExistIfRequired = true
      const fileMeta = commonMeta[fileName]
      requireField.forEach(field => {
        if (!isRequireFieldExists(fileName, fileMeta, field)) {
          isExistIfRequired = false
          errorRequiredFieldsCounter += 1
        }
      })
      if (isExistIfRequired) {
        for (let field in specialCheckFunctions) {
          if (fileMeta.hasOwnProperty(field)) {
            const messages = specialCheckFunctions[field].test(fileMeta[field])
            if (messages.length > 0) {
              console.error(`Поле ${field} в файле ${fileName} содержит ошибки:\n${messages}`)
              errorSpecialCheckCounter += messages.length
            }
          }
        }
      }
      if (isExistIfRequired && isNeedToFix) {
        const metaKeys = Object.keys(fileMeta)
        const orderRank = []
        let isNeedToSort = false
        metaKeys.forEach(field => {
          const index = requireOrder.indexOf(field)
          if (index >= 0) {
            orderRank.push()
          } else {
            console.error(`Поле ${field} не входит в список разрешённых полей`);
            process.exit(1)
          }
        })
        orderRank.forEach((order, index) => {
          if (index > 0 && order < orderRank[index - 1]) {
            if (requireOrder[order]) {
              if (!isFieldOrderValid(fileName, requireOrder[order], index, order)) {
                errorOrderFieldsCounter += 1
                isNeedToSort = true
              }
            } else {
              console.error(`Поле ${metaKeys[index]} в файле '${fileName}' не входит в список допустимых полей и должно быть заменено на допустимое или удалено`)
              errorNonValidFieldsCounter += 1
            }
          }
        })
        if (isNeedToSort) {
          const newMeta = {}
          requireOrder.forEach(field => {
            if (fileMeta.hasOwnProperty(field)) {
              newMeta[field] = fileMeta[field]
            }
          })
          outputJson[fileName] = newMeta
        }
      }
    }
  } else {
    console.error(`Список необходимых полей 'requireField' не может быть больше списка, описывающего порядок полей 'requireOrder'`)
  }

  if (errorRequiredFieldsCounter > 0 && !isNeedToFix) {
    console.error(`Количество ошибок "Нужно дополнить мету необходимыми полями": ${errorRequiredFieldsCounter}`)
    process.exit(1)
  } else if (errorOrderFieldsCounter > 0 && isNeedToFix) {
    console.error(`Количество ошибок (Нет необходимых полей): ${errorRequiredFieldsCounter}`)
    console.error(`Количество ошибок (Неправильный порядок полей): ${errorOrderFieldsCounter}`)
    console.error(`Количество ошибок (Недопустимое поле): ${errorNonValidFieldsCounter}`)
    console.error(`Количество ошибок (Специальная проверка поля): ${errorSpecialCheckCounter}`)

    if (errorNonValidFieldsCounter > 0 || errorSpecialCheckCounter > 0) {
      process.exit(1)
    }

    const filesToEdit = Object.keys(outputJson)
    filesToEdit.forEach(editFileName => {
      const editedMeta = []
      editedMeta.push('---')
      const metaKeys = Object.keys(outputJson[editFileName])
      metaKeys.forEach(field => {
        if (typeof outputJson[editFileName][field] === 'string') {
          editedMeta.push(`${field}: "${outputJson[editFileName][field]}"`)
        } else if (typeof outputJson[editFileName][field] === 'object' && Array.isArray(outputJson[editFileName][field])) {
          editedMeta.push(`${field}:`)
          outputJson[editFileName][field].forEach(value => {
            editedMeta.push(`  - ${value}`)
          })
        } else if (typeof outputJson[editFileName][field] === 'object' && !Array.isArray(outputJson[editFileName][field])) {
          editedMeta.push(`${field}:`)
          const keys = Object.keys(outputJson[editFileName][field])
          keys.forEach(key => {
            editedMeta.push(`  ${key}: '${outputJson[editFileName][field][key]}'`)
          })
        }
      })
      editedMeta.push('---\n')
      fs.readFile(editFileName, 'utf8', function (err, data) {
        if (err) {
          return console.log(err);
        }
        const result = data.replace(/---(.|\n)*---\n/g, editedMeta.join('\n'))
        fs.writeFile(editFileName, result, 'utf8', function (err) {
          if (err) return console.error(err)
          console.log(`Мета в файле '${editFileName}' отсортирована по правилам.`)
        })
      })
    })
  } else if (errorSpecialCheckCounter > 0) {
    console.error(`Количество ошибок (Специальная проверка поля): ${errorSpecialCheckCounter}`)
    process.exit(1)
  } else {
    console.log(`Ошибок в мете не найдено!`)
  }
})()
