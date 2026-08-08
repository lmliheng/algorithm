import { chatZ } from './chatZ.js'
import { messageAdd, messageCreate } from './message_tools.js'
import * as readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})


let message
function ask() {
    rl.question('user: ', async (answer) => {
        if (answer.toLowerCase() === 'exit') {
            rl.close()
            return
        }
        if (message === undefined) {
            message = messageCreate(answer)
        } else {
            message = messageAdd(message, answer, 'user')
        }
       
        let res = await chatZ(message)
        console.log('GLM:', res)
        message = messageAdd(message, res, 'assistant')

        ask() // 递归继续对话
    })
}

ask()