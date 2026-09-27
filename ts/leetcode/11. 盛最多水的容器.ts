/**
 * @difficulty medium
 * @tags 双指针,贪心,数组
 * @time O(n)
 * @space O(1)
 * @note 双指针从两端收缩，每次移动较短的一边
 * @11. 盛最多水的容器
 */

function maxArea(height: number[]) {
    let head = 0;
    let foot = height.length - 1;
    let maxArea = 0;
    while (head < foot) {
        const area = Math.min(height[head], height[foot]) * (foot - head);
        maxArea = Math.max(maxArea, area);
        if (height[head] < height[foot]) {
            head++;
        } else {
            foot--;
        }
    }
    return maxArea;
};