/**
 * @最长连续递增序列
 * 动态规划
 */




/**
 * @一般方法解决
 * 通过跳跃已遍历过的元素优化
 */
let nums = [1, 3, 5, 4, 7]
let len = 1
let res = 1
let i = 0
outer:
for (i; i < nums.length; i++) {
    for (let j = i; j < nums.length - 1; j++) {
        if (nums[j] < nums[j + 1]) {
            len++
        } else {
            res = Math.max(res, len)
            i = j 
            len=1
            continue outer
        }
        i++

    }
}
