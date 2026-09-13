
/**
 * 
 * @找出最大的几近缺失整数
 * 脑筋急转弯
 */
export function largestInteger(nums, k) {
    let n = nums.length
    if (k === 1) {
        // 重复的不要
        let map = new Map()
        for (let i = 0; i < n; i++) {
            if (!map.has(nums[i])) {
                map.set(nums[i], 1)
            } else {
                map.set(nums[i], map.get(nums[i]) + 1)
            }
        }
        let arr = [...map].filter(item => item[1] == 1).map(item => item[0])
        if (arr.length == 0) {
            return -1
        } else {
            return Math.max(...arr)
        }
    } else if (k === n) {
        return Math.max(...nums)
    } else {
        let l = nums[0]
        let l_num = 1
        let r = nums[n - 1]
        let r_num = 1
        for (let i = 0; i < n; i++) {
            if (i !== 0 && nums[i] == l) {
                l_num++
            }
            if (i !== n - 1 && nums[i] == r) {
                r_num++
            }
        }
        let res = []
        if (r_num == 1) { res.push(r) }
        if (l_num == 1) { res.push(l) }
        if (res.length == 0) {
            return -1
        } else {
            return Math.max(...res)
        }
    }

};