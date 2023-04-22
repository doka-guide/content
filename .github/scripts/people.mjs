import fs from 'fs'

export const test = (peoplePaths) => {
  const errorMessages = []
  if (Array.isArray(peoplePaths)) {
    let errorCount = 0
    for (const peoplePath of peoplePaths) {
      if (!fs.existsSync(`./people/${peoplePath}`)) {
        errorMessages.push(`- Участника по пути 'people/${peoplePath}' не существует\n`)
        errorCount += 1
      }
    }
  }
  return errorMessages
}
