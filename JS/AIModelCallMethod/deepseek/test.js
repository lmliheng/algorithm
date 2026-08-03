import { deepseek_response } from './deepseek.js'
import { messageAdd, messageCreate } from './message_tools.js'
import * as readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})


let message

// rl.question('user:', async (answer) => {
//     let res = await deepseek_response(answer)
//     console.log('deepseek:', res)
// });


function ask() {
    rl.question('user: ', async (answer) => {
        if (answer.toLowerCase() === 'exit') {
            rl.close()
            return
        }
        if (message === undefined) {
            message = messageCreate(answer)
        } else {
            message = messageAdd(message, answer,'user')
        }

        let res = await deepseek_response(message)
        console.log('deepseek:', res)
        message=messageAdd(message,res,'assistant')

        ask() // 递归继续对话
    })
}

ask()