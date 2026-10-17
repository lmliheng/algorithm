import * as readline from 'readline'
import * as fs from 'fs'

interface InputConfig {
    prompt?: string
    exitCommands?: string[]
    maxLines?: number
    timeout?: number
}

/**
 * @Readline 数据收集器
 */
class ReadlineManager {
    private rl: readline.Interface
    private lines: string[] = []
    private config: Required<InputConfig>
    
    constructor(config: InputConfig = {}) {
        this.config = {
            prompt: '> ',
            exitCommands: ['exit', 'quit', 'q', 'close'],
            maxLines: Infinity,
            timeout: 0
        }
        
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: this.config.prompt,
            terminal: true  // 启用终端功能（自动补全等）
        })
        
        this.setupHandlers()
    }
    
    private setupHandlers(): void {

        // SIGINT 处理 (Ctrl+C)
        this.rl.on('SIGINT', () => {
            console.log('\n检测到 Ctrl+C')
            this.cleanup()
            process.exit(0)
        })
        
        // SIGCONT 处理 (后台任务恢复)
        this.rl.on('SIGCONT', () => {
            this.rl.prompt()
        })
        
        // 行输入处理
        this.rl.on('line', (line: string) => {
            const trimmed = line.trim()
            
            if (this.shouldExit(trimmed)) {
                this.cleanup()
                return
            }
            
            this.lines.push(trimmed)
            
            if (this.lines.length >= this.config.maxLines) {
                console.log('达到最大输入行数')
                this.cleanup()
            }
            
            this.rl.prompt()
        })
        
        // 关闭事件
        this.rl.on('close', () => {
            console.log('\n输入结束')
            this.processResults()
        })
        
        // 错误处理
        this.rl.on('error', (err: Error) => {
            console.error('读取错误:', err.message)
            this.cleanup()
        })
    }
    
    private shouldExit(input: string): boolean {
        return this.config.exitCommands.includes(input.toLowerCase())
    }
    
    private cleanup(): void {
        this.rl.close()
        this.rl.removeAllListeners()
    }
    
    private processResults(): void {
        console.log('收集到的数据:', this.lines)
    }
    
    start(): void {
        console.log('开始输入 (输入 exit 退出):')
        this.rl.prompt()
        
        // 超时处理
        if (this.config.timeout > 0) {
            setTimeout(() => {
                console.log('\n超时退出')
                this.cleanup()
            }, this.config.timeout)
        }
    }
    
    getLines(): string[] {
        return [...this.lines]
    }
}

// 使用示例
const manager = new ReadlineManager({
    prompt: '请输入: ',
    exitCommands: ['exit', 'quit'],
    maxLines: 10,
    timeout: 30000  // 30秒超时
})

manager.start()