// ТЕСТОВЫЙ ЗОНД, НЕ МЁРЖИТЬ. Проверяет, что в джобе сборки превью рядом с
// кодом из пулреквеста нет ключа выкатки и токенов. Печатает только да/нет.
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')

const hasHeader = (dir) => {
  try {
    return /extraheader|AUTHORIZATION/i.test(fs.readFileSync(path.join(dir, '.git', 'config'), 'utf8'))
  } catch {
    return 'нет .git/config'
  }
}

const sshDir = path.join(os.homedir(), '.ssh')
console.log('DOKA-PROBE', JSON.stringify({
  sshDir: fs.existsSync(sshDir) ? fs.readdirSync(sshDir) : 'нет',
  DEPLOY_KEY: Boolean(process.env.DEPLOY_KEY),
  GITHUB_TOKEN: Boolean(process.env.GITHUB_TOKEN),
  GH_TOKEN: Boolean(process.env.GH_TOKEN),
  ACTIONS_RUNTIME_TOKEN: Boolean(process.env.ACTIONS_RUNTIME_TOKEN),
  ACTIONS_ID_TOKEN_REQUEST_TOKEN: Boolean(process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN),
  gitHeaderPlatform: hasHeader(process.cwd()),
  gitHeaderContent: hasHeader(path.join(process.cwd(), 'content')),
  cwd: process.cwd(),
}))

module.exports = {}
