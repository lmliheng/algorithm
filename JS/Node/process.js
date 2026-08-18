
/**
 * @process 全局变量
 * 获取node进程的信息
 * 
 */


/**
 * @当前工作目录路径
 */
let currentWordDir = process.cwd()
console.log(currentWordDir)


/**
 * @读取环境变量
 */
let test = process.env.TEST
console.log(test)

/**
 * @获取命令行参数
 * 返回字符串元素的数组
 * 从数组第三个之后就是自定义的参数
 * 
 */
let argv = process.argv
console.log(argv)

