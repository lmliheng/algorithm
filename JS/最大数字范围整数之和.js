let nums = [5724, 111, 350]
let n = nums.length
const numDone = (num) => {
    let arr = num.toString().split('').map(item => (+item))
    arr.sort((a, b) => a - b)
    return arr[arr.length-1] - arr[0]
}
let array = nums.map(item => numDone(item))
console.log(array)
let max = Math.max(...array)
let res = 0
for (let i = 0; i < n; i++) {
    if (array[i] === max) {
        res += nums[i]
    }
}

console.log(res)