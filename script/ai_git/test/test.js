// const ai_git = require('../dist/ai_git.cjs')
import ai_git from '../dist/ai_git.mjs'
import path from 'path'
let logPath=path.join(import.meta.dirname,'../../../CHANGLOG.md')
// node --env-file=.env script/ai_git/test/test.js comsume
if (process.argv[2] === 'comsume') {
     await ai_git.ai_commsume(logPath)
}

if (process.argv[2] === 'changlog') {
     await ai_git.ai_changlog(logPath)
}