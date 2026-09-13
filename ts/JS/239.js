let nums = [1, 3, -1, -3, 5, 3, 6, 7]
let k = 3
if (nums.length === 0 || k === 0) return [];

const result = [];           // 存放结果
const deque = [];            // 单调递减队列，存储索引

for (let i = 0; i < nums.length; i++) {

    if (deque.length > 0 && deque[0] < i - k + 1) {
        deque.shift();  // 移除队头
    }

    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
        deque.pop();    // 移除队尾
    }

    deque.push(i);

    // 当窗口形成时，记录当前窗口最大值
    if (i >= k - 1) {
        result.push(nums[deque[0]]);
    }
}

console.log(result)