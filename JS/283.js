let nums = [0, 1, 0, 3, 12]
let zeroCount = 0
for (let i = 0; i < nums.length; i++) {
    console.log(i)
    if (nums[i] === 0) {
        nums.splice(i, 1)
        zeroCount++
        i--
    }

}


nums.push(...new Array(zeroCount).fill(0))

console.log(nums)