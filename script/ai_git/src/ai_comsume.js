import { deepseek_response } from '../../../JS/AIModelCallMethod/deepseek/deepseek.js'
import { messageAdd, messageCreate } from '../../../JS/AIModelCallMethod/deepseek/message_tools.js'
import { exec } from 'child_process'
import path from 'path'
import { writeFile } from 'fs/promises'

/**
 * @Ai总结commits内容
 * 这个要在commit后执行  对应钩子是 post-commit
 * 
 * ai读取本地commit内容，进行总结，写入changLog里
 * 
 * 目前是对本地commits的总结，在push之前使用
 * 
 * 形参路径是changlog的绝对路径
 * 
 */
export async function ai_commsume(
    logPath,
    options = {
        branch: 'master',
    }
) {


    if (logPath === undefined) {
        console.error('请写入日志文件绝对地址')
        return
    }

    try {
        const git_commit = await getGitCommit(options);
        if (git_commit.length == 0) {
            console.error('最近没有提交内容')
            return
        }
        let question = messageCreate(`用md格式帮我总结我每次提交的内容 一个commit对应150字总结，标题是commit的内容和时间，说说我做了哪些工作，可以扩展什么，工作质量怎么样,${git_commit}`)
        let res = await deepseek_response(question)
        console.log('回复：', res)
        await writeFile(logPath, '\n' + res, { flag: 'a', encoding: 'utf8' });

    } catch (error) {
        console.error('获取提交信息失败:', error.message);
    }
}

function getGitCommit(options) {
    return new Promise((resolve, reject) => {
        // git show HEAD
        exec(`git log origin/${options?.branch}..HEAD -p`, (error, stdout, stderr) => {
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




