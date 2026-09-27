/**
 * @difficulty easy
 * @tags 数组,双指针
 * @time O(n)
 * @space O(1)
 * @note 遍历并 splice 原地删除等于 val 的元素
 * @27. 移除元素
 */

function removeElement(nums: number[], val: number): number {

    let r = 0
    while (r < nums.length) {
        if (nums[r] === val) {
            nums.splice(r, 1)
            continue
        }
        r++
    }
    return nums.length
};