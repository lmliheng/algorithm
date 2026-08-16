import git_ai from '@lmliheng/ai_git'
import path from 'path'
if (process.argv[2] === 'comsume') {
    await git_ai.ai_commsume(path.join(import.meta.dirname, '../CHANGLOG.md'), {
        branch: 'master'
    })
}