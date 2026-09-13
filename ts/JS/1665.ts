let tasks = [[1, 1], [1, 4], [1, 4]]
tasks.sort((a, b) => { return -(a[1] - a[0]) + (b[1] - b[0]) })
let cur = 0// 当前能量
let max = 0// 累计需要能量
for (let i = 0; i < tasks.length; i++) {
    if (cur < tasks[i][1]) {
        let temp = tasks[i][1] - cur
        max += temp
        cur += temp
    }

    cur -= tasks[i][0]
}


console.log(max)
