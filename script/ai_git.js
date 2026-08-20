import git_ai from '@lmliheng/ai_git'
import path from 'path'
import { ai_commsume } from './ai_git/src/ai_comsume.js'
import { commit_history } from './ai_git/src/commit_history.js'

if (process.argv[2] === 'comsume') {
    await git_ai.ai_commsume(path.join(import.meta.dirname, '../CHANGLOG.md'), {
        branch: 'master'
    })
}

if (process.argv[2] === 'commits') {
    let commits = await commit_history()
    console.table(commits)
}

if (process.argv[2] === 'dev') {
    await ai_commsume(path.join(import.meta.dirname, '../CHANGLOG.md'), {
        branch: 'master',
        batch: [0,12]
    })
}