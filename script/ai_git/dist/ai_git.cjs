'use strict';

var promises = require('fs/promises');
var child_process = require('child_process');
require('path');

/**
 * @
 * fetch(url,配置对象option)
 */
async function deepseek_response(message) {
    let data = {
        model: "deepseek-v4-pro",
        messages: message,// 格式我自己书写
        thinking: { "type": "enabled" },
        reasoning_effort: "high",
        stream: false 
    };
    const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.DEEP_SEEK_API}`
        },
        body: JSON.stringify(data),
    });
    // 为什么response 是一个promise而不是一个敲定的结果
    //  为什么要对response取json
    // fetch的原则是：“头到了就让你继续，体你自己决定什么时候读”
    let res = await response.json();
    return res.choices[0].message.content
}

/**
 * @单轮对话message格式初始化
 * 这个函数可以不用，作参考意义
 */
function messageCreate(message, role = 'user') {
    return [
        { "role": `${role}`, "content": `${message}` }
    ]
}

/**
 * @在push之前进行的操作
 * 对changlog进行整理，可以不使用
 * 
 */
async function ai_changlog(logPath) {
  try {
    let FileContent = await promises.readFile(logPath);
    let res = await deepseek_response(messageCreate(`帮我整理内容，整体格式和内容不要变，主要看看有没有多余的行或者行分布不均的情况，${FileContent}`));
    await promises.writeFile(logPath, res, { flag: 'w', encoding: 'utf8' });
    console.log(res);
  }catch(e){
    console.error(e);
  }
 
}

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
async function ai_commsume(logPath) {
    try {
        const git_commit = await getGitCommit();
        // console.log(git_commit);
        // if (process.argv[2] === '--write') {
        let question = messageCreate(`用md格式帮我总结我每次提交的内容 一个commit对应150字总结，标题是commit的内容和时间，说说我做了哪些工作，可以扩展什么，工作质量怎么样,${git_commit}`);
        let res = await deepseek_response(question);
        console.log('回复：', res);
        await promises.writeFile(logPath, '\n' + res, { flag: 'a', encoding: 'utf8' });
        // }

    } catch (error) {
        console.error('获取提交信息失败:', error.message);
    }
}

function getGitCommit() {
    return new Promise((resolve, reject) => {
        // git show HEAD
        child_process.exec('git log origin/master..HEAD -p', (error, stdout, stderr) => {
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

/**
 * @统一入口文件
 */
var index = {
    ai_commsume,
    ai_changlog
};

module.exports = index;
