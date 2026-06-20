// 不要用slice一直截取数组或者字符串

// 长度遍历1-nums.length
//  LCR008
let target = 2
let nums = [2, 3, 1, 2, 4, 3]
let length = nums.length

for (let i = 1; i <= length; i++) {
    if (i === 1) {
        for (let j = 0; j < length; j++) {
            if (nums[j] >= target) {
                return 1
            }
        }
    }
    if (i > 1) {
        // let win = []
        let sum = 0
        // 初始化win
        for (let j = 0; j < i; j++) {
            // win.push(nums[j])
            sum += nums[j]
        }
        if (sum >= target) { console.log('length是', i) }
        // 滑动
        for (let j = i; j < length; j++) {
            sum = sum - nums[j - i] + nums[j]
            if (sum >= target) {
                console.log('length是', i)
            }

        }

    }
}

console.log('length是', 0)
