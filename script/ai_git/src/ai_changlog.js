import { readFile, writeFile } from 'fs/promises'
import { deepseek_response } from '../../../JS/AIModelCallMethod/deepseek/deepseek.js'
import { messageAdd, messageCreate } from '../../../JS/AIModelCallMethod/deepseek/message_tools.js'


/**
 * @在push之前进行的操作
 * 对changlog进行整理，可以不使用
 * 
 */
export async function ai_changlog(
  logPath,
  options = {
    branch: 'master',
  }) {

  if (logPath === undefined) {
    console.error('请写入日志文件绝对地址')
  }
  try {
    let FileContent = await readFile(logPath)
    let res = await deepseek_response(messageCreate(`帮我整理内容，整体格式和内容不要变，主要看看有没有多余的行或者行分布不均的情况，${FileContent}`))
    await writeFile(logPath, res, { flag: 'w', encoding: 'utf8' })
    console.log(res)
  } catch (e) {
    console.error(e)
  }

}
