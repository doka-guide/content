const fs = require('fs');

const errorBuilderForOrder = (fileName, field, index, order) => {
  if (index > order) {
    console.error(`Поле ${field} в файле '${fileName}' не на своём месте! Нужно переместить вверх.`);
    return false
  } else if (index < order) {
    console.error(`Поле ${field} в файле '${fileName}' не на своём месте! Нужно переместить вниз.`);
    return false
  }
  return true
}

const errorBuilderForExistence = (fileName, fileMeta, field) => {
  if (!fileMeta.hasOwnProperty(field)) {
    console.error(`В файле '${fileName}' нет необходимого поля ${field}`)
    return false
  }
  return true
}

const requireField = [
  'title',
  'tags',
  'authors',
  'summary'
]

const requireOrder = [
  'title',
  'tags',
  'name',
  'authors',
  'editors',
  'contributors',
  'summary',
  'cover'
]

const rawMeta = fs.readFileSync('result.json');

const commonMeta = JSON.parse(rawMeta);
let errorCounter = 0

for (const fileName in commonMeta) {
  let isExistIfRequired = true
  const fileMeta = commonMeta[fileName]
  requireField.forEach(field => {
    if (!errorBuilderForExistence(fileName, fileMeta, field)) {
      isExistIfRequired = false
      errorCounter += 1
    }
  })
  if (isExistIfRequired) {
    const metaKeys = Object.keys(fileMeta)
    if (requireField.length <= requireOrder.length) {
      const orderRank = []
      metaKeys.forEach(field => {
        orderRank.push(requireOrder.indexOf(field))
      })
      orderRank.forEach((order, index) => {
        if (index > 0 && order < orderRank[index - 1]) {
          if (!errorBuilderForOrder(fileName, requireOrder[order], index, order)) {
            errorCounter += 1
          }
        }
      })
    } else {
      console.error(`Список необходимых полей 'requireField' не может быть больше списка, описывающего порядок полей 'requireOrder'`);
      process.exit(1)
    }
    if (errorCounter > 0) {
      console.error(`Найдено ${errorCounter} ошибок`)
      process.exit(1)
    }
  }
}
