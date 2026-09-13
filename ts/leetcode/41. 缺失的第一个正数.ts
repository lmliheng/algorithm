/**
 * @41. 缺失的第一个正数
 * 
 * 实现时间复杂度为 O(n) 并且只使用常数级别额外空间
 */

/**
 * 
 * @
 * 时间O(n),空间O(n)
 */
function firstMissingPositive(nums: number[]) {
    let n=nums.length
    let set=new Set(nums) //n
    for(let i=1;i<n+2;i++){ //n
        if(!set.has(i)){
            return i
        }
    }
};

/**
 * 
 * @原地
 * 时间O(n),空间O(1)
 */
function firstMissingPositive1(nums: number[]): number {
    const n = nums.length;
    
    // 将每个正整数放到它应该在的位置上（值 x 放在索引 x-1）
    for (let i = 0; i < n; i++) {
        // 当前位置的值在 [1, n] 范围内，且没在正确位置上时进行交换
        while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
            // 交换 nums[i] 和 nums[nums[i] - 1]
            const temp = nums[nums[i] - 1];
            nums[nums[i] - 1] = nums[i];
            nums[i] = temp;
        }
    }
    
    // 遍历找出第一个不在正确位置上的数
    for (let i = 0; i < n; i++) {
        if (nums[i] !== i + 1) {
            return i + 1;
        }
    }
    // 如果都在正确位置上，则缺失的是 n+1
    return n + 1;
}