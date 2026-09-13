/**
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