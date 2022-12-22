const { existsSync } = require('fs');
const { resolve } = require('path');
const { stdout } = require('process');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const spawn = require('child_process').spawn;

const fetchOriginMain = async () => {
    console.log('⬇️  Забираем последние изменения из ветки origin/main...');
    await exec('git fetch origin main');
}

const checkGit = async () => {
    let gitCheckCommand = `git --version`;
    console.log('Проверяем Git...')
    const { stdout, stderr } = await exec(gitCheckCommand);
    if (stdout.includes('git version')) {
        return Promise.resolve('✅')
    }
    else {
        return Promise.reject("Не получилось найти Git. Установите его, вам точно пригодится :) https://github.com/git-guides/install-git")
    }
}

const getDelta = () => new Promise(async (res, rej) => {
    try {
        const diffCommand = 'git diff --name-only main .';
        const currentBranchCommand = 'git rev-parse --abbrev-ref HEAD';

        const { stdout: currentBranch, stderr } = await exec(currentBranchCommand);

        if (stderr) {
            rej(stderr)
        }

        console.log(`Получаем изменения для ветки: ${currentBranch}`);

        const {  stdout: diff } = await exec(diffCommand);
        const splitted = diff.split('\n').filter(Boolean).filter(existsSync);
        console.log('Вот что изменилось:');
        splitted.forEach((s) => console.log(`- ${s}`));
        return res(splitted);
    }

    catch(e) {
        console.log(e)
        console.log("Что-то пошло не так")
        rej([])
    }

})

const withTimeout = (fn, ms, onClear = () => {}) => new Promise(async (res, rej) => {
    try {
        let timeout = setTimeout(() => {
            res("Слишком долго ждать :( Не получилось выполнить проверку")
        }, ms)
        let result = await fn();
        res(result)
        clearTimeout(timeout)
    } catch (e) {
        onClear()
        console.log(e)
        rej("Что-то пошло не так :(")
    }
})

const runSpeller = async (files) => {

    console.log('✍️  Запускаем проверку орфографии...');
    const filesToCheck = files.filter(f => f.endsWith('.md') || f.endsWith('.html'));
    if (!filesToCheck?.length) {
        console.log('🤷‍♂️  Нет изменений для проверки');
        return Promise.resolve('✅')

    }
    const args = ['yaspeller', '--only-errors', '--file-extensions', '".md,.html"', ...filesToCheck];
    const result = spawn('npx', args, { stdio: 'inherit' });
    return new Promise(r => result.on('close', r));
}

const runChecker = async (files) => {
    if (!files?.length) {
        console.log('🤷‍♂️  Нет изменений для проверки');
        return;
    }

    console.log('✍️  Запускаем проверку форматирования...');
    const result = spawn('npx', ['editorconfig-checker/editorconfig-checker.javascript.git#master', '-config=.editorconfig', ...files], { stdio: 'inherit' });
    return new Promise(r => result.on('close', r));
}

const run = async () => {
    try {
        await withTimeout(checkGit, 1000);
        await withTimeout(fetchOriginMain, 10000);
        const delta = await withTimeout(getDelta, 10000);
        await withTimeout(() => runSpeller(delta), 10000);
        await runChecker(delta);
        process.exit(0)
    } catch (e) {
        console.error(e)
        process.exit()
    }

}

run()


