const fs = require('fs')

const addedContent = fs.readFileSync('added-content.txt').toString().split('\n')

const currentDate = new Date()
const currentYear = currentDate.getFullYear()
const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const currentMonth = monthNames[currentDate.getMonth()]
const header = `## ${currentMonth} ${currentYear}`

const contentList = addedContent
  .map((fileName) => {
    if (fs.existsSync(fileName)) {
      const url = `https://doka.guide/${fileName.replace('index.md', '')}`
      const date = process.argv[2]

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
        .map((a) => {
          const authorFileName = `./people/${a}/index.md`
          if (fs.existsSync(authorFileName)) {
            return fs.readFileSync(authorFileName)
              .toString()
              .match(/name: ('|"|).*('|"|)\n/)[0]
              .replace(/name: ('|"|)/, '')
              .replace(/('|"|)\n/, '')
          }
          return authorFileName
        })

      return `- ${date}, [${title}](${url}), ${authors.join(', ')}`
    }
  })

const changelogFileName = './CHANGELOG.md'
if (fs.existsSync(changelogFileName)) {
  const changelog = fs.readFileSync(changelogFileName).toString().split('\n')
  if (changelog.filter((s) => s.startsWith('## ')).includes(header)) {
    const headerPosition = changelog.findIndex((s) => s === header)
    changelog.splice(headerPosition + 2, 0, ...contentList)
  } else {
    const headerPosition = 4
    changelog.splice(headerPosition, 0, ...[header, '', ''])
    changelog.splice(headerPosition + 2, 0, ...contentList)
  }
  fs.writeFileSync(changelogFileName, changelog.join('\n'))
  console.log('Записи добавлены в CHANGELOG.md');
} else {
  console.log('Нечего добавлять в CHANGELOG.md');
}
