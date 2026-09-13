/***
 * @轮转数组
 * 暴力解会超时
 * 反转法 比如[1,2,3,4,5,6],k=10,实际上转k%=6，k=4 整体反转[6,5,4,3,2,1] 
 * 反转前k个,[3,4,5,6,2,1] 反转后len-k个,[3,4,5,6,1,2]得到结果
 */
export function rotate(nums, k) {
    let n = nums.length
    k %= n
    nums.reverse()
    const reverse = (l, r) => {
        while (l < r) {
            [nums[l], nums[r]] = [nums[r], nums[l]]
            l++
            r--
        }
    }
    reverse(0, k - 1)
    reverse(k, n - 1)
};

