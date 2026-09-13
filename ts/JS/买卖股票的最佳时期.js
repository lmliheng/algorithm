/**
 * @买卖股票的最佳时期
 */

let prices = [7, 1, 5, 3, 6, 4]
let res = 0
let n = prices.length
let max = prices[0]
let min = prices[0]
for (let i = 0; i < n; i++) {
    if (prices[i] > max) {
        max = prices[i]
        res = Math.max(max - min, res)
    }
    if (prices[i] < min) {
        min = prices[i]
        max = prices[i]
    }
}


console.log(res)


