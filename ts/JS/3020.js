let nums = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]
let n = nums.length
let res = 0
let map = new Map()
for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
        map.set(nums[i], map.get(nums[i]) + 1)
    } else {
        map.set(nums[i], 1)
    }
}
console.log(map)
// 峰值数是1
if (map.has(1)) {
    if (map.get(1) % 2) {
        res = map.get(1)
    } else {
        // 万一全是1
        res = map.get(1) - 1
    }
}

map.delete(1)

//k是最小数
for (const [k, v] of map) {
    let len = 0
    if (map.get(k) >= 2) {
        len += 2
    } else {
        continue
    }
    let nextNum = k * k
    while (map.has(nextNum) && map.get(nextNum) >= 2) {
        len += 2
        nextNum *= nextNum
    }
    res = Math.max(res, len + (map.has(nextNum) ? 1 : -1))
}
console.log(res)