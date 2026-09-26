import { autocomplete, isCancel } from '@clack/prompts'

/**
 * @按键级实时菜单
 * autocomplete 提供输入框 + 实时过滤列表：方向键选择、Tab 补全、Enter 执行、Ctrl+C 取消
 */
const commands = [
    { value: '/help', hint: '查看帮助' },
    { value: '/deploy', hint: '部署' },
    { value: '/login', hint: '登录' },
    { value: '/logout', hint: '退出登录' }
]

while (true) {
    const cmd = await autocomplete({
        message: '输入命令',
        placeholder: '输入 / 开头过滤',
        options: commands,
        // 按前缀匹配，而不是库默认的模糊匹配
        filter: (search, option) => String(option.value).startsWith(search),
        
        completeOnTab: true
    })

    if (isCancel(cmd)) break

    console.log('EXEC:', cmd)
}
