/**
 * @长度最小的子数组
 */


/**
 * 
 * @滑动窗口
 * 
 * 注意是大于等于target都是合法的窗口
 * 
 */
function minSubArrayLen(target, nums) {
    let left = 0
    let sum = 0
    let res = Infinity
    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];
        while (sum >= target) {
            res = Math.min(res, right - left + 1);
            sum -= nums[left++];
        }
    }
    return res === Infinity ? 0 : res;
}



/**
 * @使用前缀和是超时的
 * 按理说这种连续子数组和的问题用前缀和
 * 但是这里前缀和超时了
 * 
 */
function minSubArrayLen1(target, nums) {
    let n = nums.length
    let res = Infinity
    let sum_array = Array.from({ length: n }, () => 0)
    let sum = 0
    for (let i = 0; i < n; i++) {
        sum += nums[i]
        sum_array[i] = sum
        if (sum_array[i] >= target) {
            res = Math.min(res, i + 1)
        }
    }
    
    for (let i = 0; i < n; i++) {
        for (let j = i; j >= 0; j--) {
            if (sum_array[i] - sum_array[j] >= target) {
                res = Math.min(res, i - j )
                break
            }
        }
    }

    return res==Infinity?0:res

};