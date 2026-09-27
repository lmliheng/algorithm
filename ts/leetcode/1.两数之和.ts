/**
 * @difficulty easy
 * @tags 哈希表,数组
 * @time O(n)
 * @space O(n)
 * @note 遍历时用哈希表存补数，命中即返回
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