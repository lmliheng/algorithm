/**
 * @解码方法1
 * @求答案的个数使用动态规划
 * 
 * 扩展：解码方法2
 */
let s = "2261021"
//"2261021"

let res = 0
// 
let n = s.length
if (s[0] === '0') {
    console.log(0)
}
// dp[i]是以i+1结尾的解码方法数
let dp = new Array(n + 1).fill(0)
dp[0] = 1 //''
for (let i = 1; i <= n; i++) {
    if (s[i - 1] !== '0') {
        dp[i] += dp[i - 1]
    }
    if (i > 1 && s[i - 2] !== '0' && ((+(s[i - 2] + s[i - 1])) < 27)) {
        dp[i] += dp[i - 2]
    }
}
console.log(dp)