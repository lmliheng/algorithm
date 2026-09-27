/**
 * @difficulty medium
 * @tags dp,字符串,哈希表
 * @time O(n^2)
 * @space O(n)
 * @note dp[i] 表示前 i 个字符可拆分，Set 查子串
 * @139. 单词拆分（解法二）
 */

let s = "catsanddog"
let wordDict = ["cats", "dog", "sand", "and", "cat"]


let set = new Set(wordDict)
let n = s.length
let dp = new Array(n + 1).fill(false)
dp[0] = true
for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
        if (dp[j] && set.has(s.substr(j, i - j))) {
            dp[i] = true;
            break;
        }
    }

}
console.log(dp)
