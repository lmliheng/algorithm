/***
 * 
 * @交换得到字典序最小的数组
 */



/**
 * 
 * @错误的解法
 */
function lexicographicallySmallestArray(nums, limit) {
    let n = nums.length
    const swap = (a, b) => {
        [nums[a], nums[b]] = [nums[b], nums[a]]
    }
    for (let i = 0; i < n - 1; i++) {
        let min = Math.min(...nums.slice(i + 1))
        if (nums[i] <= min || nums[i] - min > limit) {
            continue
        }
        let index = nums.slice(i + 1).indexOf(min)
        swap(i, index)
    }
    return nums
};


console.log(lexicographicallySmallestArray([1,7,6,18,2,1],3))