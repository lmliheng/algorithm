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

项目根目录运行
```js
import git_ai from '@lmliheng/ai_git'
import path from 'path'
await git_ai.ai_commsume(path.join(import.meta.dirname, '../CHANGLOG.md'), {
        branch: 'master'
})
```