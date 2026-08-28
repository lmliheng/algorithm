/**
 * @分割等和子集
 * 
 * @0 1 背包问题
 * 使用set记录存在的和值，
 */
function canPartition(nums) {
    let n = nums.length
    let sum = 0
    for (let i = 0; i < n; i++) {
        sum += nums[i]
    }
    if (sum % 2) { return false }

    let set = new Set([0])
    for (let i = 0; i < n; i++) {
        let raw_set = new Set([...set])
        for (let j of raw_set) {
            if (j + nums[i] == sum / 2) { return true }
            set.add(j + nums[i])
        }
    }
    console.log(set)
    return false
};