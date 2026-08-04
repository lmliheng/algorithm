/**
 * @单轮对话message格式初始化
 * 这个函数可以不用，作参考意义
 */
export function messageCreate(message, role = 'user') {
    return [
        { "role": `${role}`, "content": `${message}` }
    ]
}
/**
 * @多轮对话message增加
 */
export function messageAdd(messageArray, message, role) {
    messageArray.push({ "role": `${role}`, "content": `${message}` })
  //  console.log(messageArray)
    return messageArray
}