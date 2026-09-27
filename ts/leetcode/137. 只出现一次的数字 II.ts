/**
 * @difficulty medium
 * @tags 位运算,哈希表,数组
 * @time O(n)
 * @space O(n)
 * @note 两个 Set 记录出现过的数与重复数
 * @137. 只出现一次的数字 II
 */

let nums: number[] = [0, 1, 0, 1, 0, 1, 99]

let set: Set<number> = new Set()
let visitSet: Set<number> = new Set()
for (let i = 0; i < nums.length; i++) {
    if (!set.has(nums[i])) {
        set.add(nums[i])
    } else {
        visitSet.add(nums[i])
    }
}
console.log([...set].filter(item => !visitSet.has(item))[0])

export {};
