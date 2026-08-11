/**
 * @提交云端前运行的脚本
 * ai读取本地commit内容，进行总结，写入changLog里
 */
import { deepseek_response } from '../JS/AIModelCallMethod/deepseek/deepseek.js'
import { messageAdd, messageCreate } from '../JS/AIModelCallMethod/deepseek/message_tools.js'
import { exec } from 'child_process'
import path from 'path'
import { writeFile } from 'fs/promises'

let git_commit = ''
function getGitCommit() {
    return new Promise((resolve, reject) => {
        exec('git show HEAD', (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            if (stderr) {
                reject(new Error(stderr));
                return;
            }
            resolve(stdout);
        });
    });
}


try {
    const git_commit = await getGitCommit();
    console.log(git_commit);
    let question = messageCreate(`用md格式帮我用150字总结我这次提交的内容，说说我做了哪些工作，可以扩展什么，工作质量怎么样,${git_commit}`)
    let res = await deepseek_response(question)
    console.log('回复：', res)
    await writeFile(path.join(import.meta.dirname, '../CHANGLOG.md'), res, { flag: 'a', encoding: 'utf8' });
} catch (error) {
    console.error('获取提交信息失败:', error.message);
}

