import { exec } from 'child_process'


/**
 * @获取历史提交版本
 */
export async function commit_history(options = {}) {
    let git_commit_history = await getCommitHash(options)
    let git_commit_title = await getCommitTitle(options)
    let parseHistory = git_commit_history.split('\n')
    let parseTitle = git_commit_title.split('\n')
    let len = parseHistory.length
    let commit_info = Array.from({ length: len }, () => 0).map((item, index) => [parseTitle[index], parseHistory[index]])
    //console.table(commit_info)
    return commit_info
}


function getCommitHash(options) {
    return new Promise((resolve, reject) => {
        // git show HEAD
        exec(`git rev-list -n 100 HEAD`, (error, stdout, stderr) => {
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
        exec(`git log -n 100 --pretty=format:"%s"`, (error, stdout, stderr) => {
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

