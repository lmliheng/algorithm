/**
 * @柱状图中最大的矩形
 */
function largestRectangleArea(heights) {
    let maxArea = 0;
    const stack = [];
    heights = [0, ...heights, 0];

    for (let i = 0; i < heights.length; i++) {
        while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
            const h = heights[stack.pop()];
            const w = i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, h * w);
        }
        stack.push(i);
    }

    return maxArea;
};