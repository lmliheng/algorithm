/**
 * @接雨水
 */
let height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
let MaxHeightIndex = height.indexOf(Math.max(...height))
console.log(MaxHeightIndex) 
let maxArea = 0
let leftmaxHeight = 0
let rightmaxHeight = 0
for (let i = 0; i < MaxHeightIndex; i++) {
    if (height[i] > leftmaxHeight) {
        leftmaxHeight = height[i]
    }
    maxArea += leftmaxHeight - height[i]
}

for (let i = height.length - 1; i > MaxHeightIndex; i--) {
    if (height[i] > rightmaxHeight) {
        rightmaxHeight = height[i]
    }

    maxArea += rightmaxHeight - height[i]
}

console.log(maxArea)