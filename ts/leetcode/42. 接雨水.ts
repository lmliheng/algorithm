/**
 * @difficulty hard
 * @tags 数组,双指针
 * @time O(n)
 * @space O(1)
 * @note 以最高柱为中轴，两侧累加前缀最大值差
 * @42. 接雨水
 */
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height: number[]) {
    let maxHeightIndex = height.indexOf(Math.max(...height))
    let maxArea = 0
    let leftmaxHeight = 0
    let rightmaxHeight = 0
    for (let i = 0; i < maxHeightIndex; i++) {
        if (height[i] > leftmaxHeight) {
            leftmaxHeight = height[i]
        }
        maxArea += leftmaxHeight - height[i]
    }
    for (let i = height.length - 1; i > maxHeightIndex; i--) {
        if (height[i] > rightmaxHeight) {
            rightmaxHeight = height[i]
        }
        maxArea += rightmaxHeight - height[i]
    }
    return maxArea

};