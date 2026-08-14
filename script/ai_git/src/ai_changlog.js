import { readFile, writeFile } from 'fs/promises'
import { deepseek_response } from '../../../JS/AIModelCallMethod/deepseek/deepseek.js'
import { messageAdd, messageCreate } from '../../../JS/AIModelCallMethod/deepseek/message_tools.js'


/**
 * @在push之前进行的操作
 * 对changlog进行整理，可以不使用
 * 
 */
export async function ai_changlog(logPath) {
  console.log(logPath)
}
