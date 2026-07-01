
/**
 * @正则Regex
 */
let a = 'a.b哈哈哈'
/**
 * @g表示全局
 * @匹配.，使用\.使用的是转义
 */
console.log(a.replace(/\./g, '[]')) // a[]b哈哈哈

let 