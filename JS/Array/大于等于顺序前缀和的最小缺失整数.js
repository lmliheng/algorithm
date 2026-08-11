/**
 * @大于等于顺序前缀和的最小缺失整数
 */

export var missingInteger = function (nums) {
    let set = new Set(nums)
    let record = nums[0]
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i + 1] === nums[i] + 1) {
            record += nums[i + 1]
        } else {
            break
        }
    }
    let res = 0
    while (true) {
        if (!set.has(record)) {
            return record
        }
        record++
    }

};