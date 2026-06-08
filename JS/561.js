let nums = [1, 4, 3, 2]
let res = 0
nums.sort((a, b) => a - b)
for (let i = 0; i < nums.length; i++) {
    if ((i & 1) === 0) {
        res += nums[i]
    }
}
console.log(res)