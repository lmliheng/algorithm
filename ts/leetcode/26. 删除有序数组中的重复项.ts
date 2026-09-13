/**
 * @26. 删除有序数组中的重复项
 */
function removeDuplicates(nums: number[]): number {
    let l = 0
    let r = 1
    while (r < nums.length) {
        if (nums[l] == nums[r]) {
            nums.splice(r, 1)

            continue
        } else {
            l++
            r++
        }
    }
    console.log(nums)
    return nums.length
}