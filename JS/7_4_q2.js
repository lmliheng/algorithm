let nums = [1, 3, 5, 2, 8, 1]
let k = 3

if (k === 1) {
    nums.sort((a, b) => b - a)
    console.log(nums[0] + nums[1])
}

let n = nums.length;
let l_max = 0;
let r_max = 0;
let res = 0
let win = [];
// 滑动窗口 k-1长度的空窗 将数组分成两半
for (let i = 0; i < k - 1; i++) {
    l_max = 0
    r_max = Math.max(...nums.slice(k - 1))

}
res = Math.max(l_max + r_max, res)

console.log(l_max, r_max)

for (let i = k - 1; i < n; i++) {
    //left
    if (nums[i - k + 1] > l_max) {
        l_max = nums[i - k + 1]
    }
    //right
    if (nums[i] === r_max) {
        r_max = Math.max(...nums.slice(i+1))
    }
    console.log(i, l_max, r_max)
    res = Math.max(l_max + r_max, res)
}

console.log(res)




