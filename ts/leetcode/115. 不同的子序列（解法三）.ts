/**
 * @115. 不同的子序列（解法三）
 * dp解法 - 困难
 */
let s: string = "rabbbit"
let t: string = "rabbit"

let n: number = t.length
//dp表示
let dp: number[] = new Array(n + 1).fill(0)
dp[0] = 1
for (let i = 0; i < s.length; i++) {
    for (let j = n - 1; j >= 0; j--) {
        if (s[i] === t[j]) {
            dp[j + 1] += dp[j]
        }
    }
}
console.log(dp)
console.log(dp[n])

export {};
