const util = require('util');
const exec = util.promisify(require('child_process').exec);
const spawn = require('child_process').spawn;

const fetchOriginMain = async () => {
    console.log('⬇️  Забираем последние изменения из ветки origin/main...');
    await exec('git fetch origin main');
}

const getDelta = async () => {
    const diffCommand = 'git diff --name-only main .';
    const currentBranchCommand = 'git rev-parse --abbrev-ref HEAD';

    const { stdout: currentBranch } = await exec(currentBranchCommand);

    console.log(`Получаем изменения для ветки: ${currentBranch}`);

    const {  stdout: diff } = await exec(diffCommand);
    const splitted = diff.split('\n').filter(Boolean);
    console.log('Вот что изменилось:');
    splitted.forEach((s) => console.log(`- ${s}`));
    return splitted;
}

const runSpeller = async (files) => {
    console.log('✍️  Запускаем проверку орфографии...');
    const filesToCheck = files.filter(f => f.endsWith('.md') || f.endsWith('.html'));
    const args = ['yaspeller', '--only-errors', '--file-extensions', '".md,.html"', ...filesToCheck];
    const result = spawn('npx', args, { stdio: 'inherit' });
    return new Promise(r => result.on('close', r));
}

const runChecker = async (files) => {
    console.log('✍️  Запускаем проверку форматирования...');
    const result = spawn('editorconfig-checker', ['-config=.editorconfig', ...files], { stdio: 'inherit' });
    return new Promise(r => result.on('close', r));
}

const run = async () => {
    await fetchOriginMain();
    const delta = await getDelta();
    await runSpeller(delta);
    await runChecker(delta);
}

run()