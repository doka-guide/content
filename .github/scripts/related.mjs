import fs from 'fs'

export const test = (relatedArticlePaths) => {
  const errorMessages = []
  if (Array.isArray(relatedArticlePaths)) {
    let errorCount = 0
    for (const articlePath of relatedArticlePaths) {
      if (!fs.existsSync(`./${articlePath}`)) {
        errorMessages.push(`- материала по пути '${articlePath}' не существует\n`)
        errorCount += 1
      }
    }
  }
  return errorMessages
}
