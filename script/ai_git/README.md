更新方向：
目前git操作均由我写死，逻辑固定
后续引入Agent模式，结合git MCP,实现功能自动化

使用
```
npm i @lmliheng/ai_git
```
.env
```
DEEP_SEEK_API='你的API_KEY'
```

项目根目录
```js
import git_ai from '@lmliheng/ai_git'
import path from 'path'
if (process.argv[2] === 'comsume') {
    await git_ai.ai_commsume(path.join(import.meta.dirname, '../CHANGLOG.md'), {
        branch: 'main'
    })
}

if (process.argv[2] === 'commits') {
    let commits = await git_ai.commit_history()
    console.table(commits)
}

if (process.argv[2] === 'batch') {
    await git_ai.ai_commsume(path.join(import.meta.dirname, '../CHANGLOG.md'), {
        branch: 'main',
        batch: [0,26]
    })
}
```