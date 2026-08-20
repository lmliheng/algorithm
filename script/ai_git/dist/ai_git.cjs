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
            "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`
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
async function ai_changlog(
  logPath,
  options = {
    branch: 'master',
  }) {

  if (logPath === undefined) {
    console.error('请写入日志文件绝对地址');
  }
  try {
    let FileContent = await promises.readFile(logPath);
    let res = await deepseek_response(messageCreate(`帮我整理内容，整体格式和内容不要变，主要看看有没有多余的行或者行分布不均的情况，${FileContent}`));
    await promises.writeFile(logPath, res, { flag: 'w', encoding: 'utf8' });
    console.log(res);
  } catch (e) {
    console.error(e);
  }

}

/**
 * @获取历史提交版本
 */
async function commit_history(options = {}) {
    let git_commit_history = await getCommitHash();
    let git_commit_title = await getCommitTitle();
    let parseHistory = git_commit_history.split('\n');
    let parseTitle = git_commit_title.split('\n');
    let len = parseHistory.length;
    let commit_info = Array.from({ length: len }, () => 0).map((item, index) => [parseTitle[index], parseHistory[index]]);
    //console.table(commit_info)
    return commit_info
}


function getCommitHash(options) {
    return new Promise((resolve, reject) => {
        // git show HEAD
        child_process.exec(`git rev-list -n 100 HEAD`, (error, stdout, stderr) => {
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


function getCommitTitle(options) {
    return new Promise((resolve, reject) => {
        // git show HEAD
        child_process.exec(`git log -n 100 --pretty=format:"%s"`, (error, stdout, stderr) => {
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
 * @Ai总结commits内容
 * 这个要在commit后执行  对应钩子是 post-commit
 * 
 * ai读取本地commit内容，进行总结，写入changLog里
 * 
 * 目前是对本地commits的总结，在push之前使用
 * 
 * 形参路径是changlog的绝对路径
 * 
 * 如果batch是非空数组(默认[])，可以批量总结，写入总结序列号范围，合法[0,4]
 * 参考commit_history.js
 * 
 *  options = {
        branch: 'master',
        batch: []
    }
 */
async function ai_commsume(
    logPath,
    options = {
        branch: 'master',
        batch: [0, 0],
    }
) {

    if (logPath === undefined) {
        console.error('请写入日志文件绝对地址');
        return
    }

    if (options.batch !== undefined) {
        try {
            let commit_info = await commit_history();
            // 倒着遍历
            for (let i = options.batch[1]; i >= options.batch[0]; i--) {
                console.log(commit_info[i][0]);
                let git_commit = await getCommitByHash(commit_info[i][1]);
                console.log(git_commit);
                if (git_commit.length == 0) {
                    console.error('最近没有提交内容...');
                    return
                }
                let question = messageCreate(`用md格式帮我总结我每次提交的内容 一个commit对应150字总结，标题是commit的内容和时间，说说我做了哪些工作，可以扩展什么，工作质量怎么样,${git_commit}`);
                let res = await deepseek_response(question);
                console.log('回复：', res);
                await promises.writeFile(logPath, '\n' + res, { flag: 'a', encoding: 'utf8' });
            }
            return
        } catch (e) {
            console.log(e);
        }
    }

    try {
        const git_commit = await getGitCommit(options);
        if (git_commit.length == 0) {
            console.error('最近没有提交内容');
            return
        }
        let question = messageCreate(`用md格式帮我总结我每次提交的内容 一个commit对应150字总结，标题是commit的内容和时间，说说我做了哪些工作，可以扩展什么，工作质量怎么样,${git_commit}`);
        let res = await deepseek_response(question);
        console.log('回复：', res);
        await promises.writeFile(logPath, '\n' + res, { flag: 'a', encoding: 'utf8' });
    } catch (error) {
        console.error('获取提交信息失败:', error.message);
    }
}

function getGitCommit(options) {
    return new Promise((resolve, reject) => {
        // git show HEAD
        child_process.exec(`git log origin/${options?.branch}..HEAD -p`, (error, stdout, stderr) => {
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

function getCommitByHash(hash) {
    return new Promise((resolve, reject) => {
        // git show HEAD
        child_process.exec(`git show -m --first-parent ${hash}`, (error, stdout, stderr) => {
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
    ai_changlog,
    commit_history
};

module.exports = index;
