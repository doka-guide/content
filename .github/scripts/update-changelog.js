const fs = require('fs')

const changelogFileName = './CHANGELOG.md'
const currentDate = new Date()
const currentYear = currentDate.getFullYear()
const monthNames = [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ]
const updateContentMonthNames = [ "января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря" ]

function extractInfo(fileName) {
  if (fs.existsSync(fileName)) {
    const url = `https://doka.guide/${fileName.replace('index.md', '')}`
    const dataFile = `${fileName.replace('index.md', 'index.11tydata.json')}`
    const rowDate = new Date(JSON.parse(fs.readFileSync(dataFile).toString()).updatedAt)
    const date = `${rowDate.getDate()} ${updateContentMonthNames[rowDate.getMonth()]}`

    const content = fs.readFileSync(fileName).toString()
    const title = content
      .match(/title: ('|"|).*('|"|)\n/)[0]
      .replace(/title: ('|"|)/, '')
      .replace(/('|"|)\n/, '')
    const authorsSelection = /authors:\n(  - .*\n)+(contributors|cover|editors|keywords|related|tags):/
    const authors = content
      .match(authorsSelection)[0]
      .split('\n')
      .slice(1, -1)
      .map((s) => s.replace('  - ', ''))
      .filter((a) => a !== 'doka-dog')
      .map((a) => {
        const authorFileName = `./people/${a}/index.md`
        if (fs.existsSync(authorFileName)) {
          return fs
            .readFileSync(authorFileName)
            .toString()
            .match(/name: ('|"|).*('|"|)\n/)[0]
            .replace(/name: ('|"|)/, '')
            .replace(/('|"|)\n/, '')
        }
        return authorFileName
      })

    return `- ${date}, [${title}](${url}), ${authors.join(', ')}`
  }
  return ''
}

function processContent(contentFileName) {
  const contentFileList = fs
    .readFileSync(contentFileName)
    .toString()
    .split('\n')

  if (
    contentFileList.length === 0 ||
    (contentFileList.length > 0 && contentFileList[0] === '')
  ) {
    return
  }

  const contentList = contentFileList.map((fileName) => extractInfo(fileName))

  const currentDate = new Date()
  const currentMonth = monthNames[currentDate.getMonth()]
  const header = `## ${currentMonth} ${currentYear}`

  if (contentList.length > 0) {
    if (fs.existsSync(changelogFileName)) {
      const changelog = fs.readFileSync(changelogFileName).toString().split('\n')
      if (changelog.filter((s) => s.startsWith('## ')).includes(header)) {
        const headerPosition = changelog.findIndex((s) => s === header)
        changelog.splice(headerPosition + 2, 0, ...contentList)
      } else {
        const headerPosition = 4
        changelog.splice(headerPosition, 0, ...[header, ''])
        changelog.splice(headerPosition + 2, 0, ...contentList)
      }

      fs.writeFileSync(changelogFileName, changelog.join('\n'))
      console.log('Новые материалы добавлены в CHANGELOG.md')
    }
  } else {
    console.log('Нечего добавлять из списка новых материалов в CHANGELOG.md')
  }
}

processContent('./added-content.txt')
processContent('./update-content.txt')
