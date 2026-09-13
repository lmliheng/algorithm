/**
 * @买卖股票的最佳时期2
 */
let prices = [7, 1, 5, 3, 6, 4]
let res = 0
let cur = prices[0]
let i = 1
for (i; i < prices.length; i++) {
    if (prices[i] > cur) {
        res += (prices[i] - cur)
        cur = prices[i]
    } else {
        cur = Math.min(cur, prices[i])
    }
}
console.log(res)