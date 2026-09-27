/**
 * @difficulty medium
 * @tags 滑动窗口,数组
 * @time O(n)
 * @space O(1)
 * @note 窗口只看连续三个数，未覆盖子序列情形
 * @456. 132模式
 */
let nums = [1,0,1,-4,-3]

if (nums.length < 3) {
    false
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
