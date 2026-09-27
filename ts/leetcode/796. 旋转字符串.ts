/**
 * @difficulty easy
 * @tags 字符串
 * @note 只做了左旋一位的演示，未实现本题
 * @796. 旋转字符串
 */
let s = "abcde"
s=s+s.slice(0,1)
s=s.replace(s[0],"")
console.log(s)
