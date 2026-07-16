/**
 * @数对的最大公约数之和
 */
var gcdSum = function (nums) {
    let n = nums.length
    let max = 0
    let prefixGcd = new Array(n)

    const gcd = (a, b) => {
        if (b === 0) { return a }
        return gcd(b, a % b)
    }

    for (let i = 0; i < n; i++) {
        max = Math.max(max, nums[i])
        prefixGcd[i] = gcd(max, nums[i])

    }
    console.log(prefixGcd)
    prefixGcd.sort((a, b) => a - b)
    let res = 0
    let l = 0
    let r = n - 1
    while (l < r) {
        res += gcd(prefixGcd[l], prefixGcd[r])
        l++
        r--
    }

    return res
};