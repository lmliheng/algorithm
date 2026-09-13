/**
 * 
 * @两数之和
 * 时间复杂度O(n),空间复杂度
 */

function twoSum(nums: number[], target: number) {
    let map = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i])) {
            return [map.get(nums[i]), i];
        }
        map.set(target - nums[i], i);
    }
    return [];
}