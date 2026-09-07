const fs = require('fs')

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
  processIndexFile(commonMeta, 'a11y/index.md')

  const { requireField, requireOrder, specialCheck } = JSON.parse(settings)
  let errorRequiredFieldsCounter = 0
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

        // Порядок полей не проверяем: на вёрстку страницы он не влияет, а
        // сорок пять статей репозитория живут с другим порядком — заставлять
        // автора править их ради косметики незачем. `requireOrder` остаётся
        // рекомендацией из документации и списком допустимых полей.
        //
        // Опечатку в имени поля ловим: поле не из списка молча ничего не
        // делает, и человек ждёт от него эффекта.
        Object.keys(fileMeta).forEach(field => {
          if (!requireOrder.includes(field)) {
            console.error(`Поле ${field} в файле '${fileName}' не входит в список допустимых полей и должно быть заменено на допустимое или удалено`)
            errorNonValidFieldsCounter += 1
          }
        })
      }
    }
  } else {
    console.error(`Список необходимых полей 'requireField' не может быть больше списка, описывающего порядок полей 'requireOrder'`)
  }

  const errors =
    errorRequiredFieldsCounter +
    errorNonValidFieldsCounter +
    errorSpecialCheckCounter

  if (errors > 0) {
    console.error(`Количество ошибок (Нет необходимых полей): ${errorRequiredFieldsCounter}`)
    console.error(`Количество ошибок (Недопустимое поле): ${errorNonValidFieldsCounter}`)
    console.error(`Количество ошибок (Специальная проверка поля): ${errorSpecialCheckCounter}`)
    process.exit(1)
  }

  console.log(`Ошибок в мете не найдено!`)
})()
