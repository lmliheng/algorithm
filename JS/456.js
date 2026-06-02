let nums = [1,0,1,-4,-3]

if (nums.length < 3) {
    return false
}
// 用队列
let quene = [nums[0], nums[1], nums[2]]
for (let i = 0; i < nums.length - 2; i++) {

    if (i !== 0) {
        quene.shift()
        quene.push(nums[i + 2])
    }
    console.log("quene:", quene)
    if (quene[0] < quene[1] && quene[1] > quene[2] && quene[0] < quene[2]) {
        console.log(true)
    }

}
console.log(false)