/**
 * @滑动窗口的最大值
 * 239  
 * 其实是单调队列的题
 * 
 * 单调队列中记录 单减区间的索引，
 * i表示遍历的区间的最后一个索引，即区间范围是[i-k,i]
 * 队头表示最大值索引，队尾最小
 * 每次区间右移，队头如果不在区间内就弹出,队尾比新进元素小就弹出，直到比新进元素大或者队列弹空
 * 
 */
export function maxSlidingWindow(nums, k) {
    if (nums.length === 0 || k === 0) return [];
    const result = [];
    const dequene = [];
    for (let i = 0; i < nums.length; i++) {
        if (dequene.length > 0 && dequene[0] < i - k + 1) {
            dequene.shift();
        }
        while (dequene.length > 0 && nums[dequene[dequene.length - 1]] < nums[i]) {
            dequene.pop();
        }
        dequene.push(i);
        // 当窗口形成时，记录当前窗口最大值
        if (i >= k - 1) {
            result.push(nums[dequene[0]]);
        }
    }

    return result;
};

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3))