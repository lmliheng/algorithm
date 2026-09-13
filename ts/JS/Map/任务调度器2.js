/**
 * @任务调度器 II
 */


/**
 * 
 * @哈希表
 * 超时
 */
function taskSchedulerII(tasks, space) {
    let day = 0
    let TaskRecord = new Map()
    for (let i = 0; i < tasks.length; i++) {
        if (!TaskRecord.has(tasks[i])) {
            TaskRecord.set(tasks[i], day)
            day++
        } else {
            while (day - TaskRecord.get(tasks[i]) <= space) {
                day++// 休息
            }
            TaskRecord.set(tasks[i], day)
            day++// 任务
        }
    }
    return day
};

/**
 * 
 * @哈希表
 * 不超时，直接用Math.max不用while一个一个加天数
 */
var taskSchedulerII = function (tasks, space) {
    let res = 0
    // 记录完成第i个任务需要的天数
    let mp = new Map()
    for (let x of tasks) {
        res += 1
        if (!mp.has(x)) {
            mp.set(x, res)
        } else {

            res = Math.max(res, mp.get(x) + space + 1)
            mp.set(x, res)
        }
    }
    return res
}