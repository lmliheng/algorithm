/**
 * @课程表
 * 
 * 考察有向图的出度入度
 * 
 * [a,b] 要修a先修b，这个课程可以直接选即入度为0
 * 
 * 
 */

function canFinish(numCourses, prerequisites) {
    let res = 0
    // 课程的入度值
    let degree = Array.from({ length: numCourses }, () => 0)
    let graph = {}
    for (let i = 0; i < prerequisites.length; i++) {
        degree[prerequisites[i][0]] += 1
        if (graph[prerequisites[i][1]] == undefined) {
            graph[prerequisites[i][1]] = [prerequisites[i][0]]
        } else {
            graph[prerequisites[i][1]].push(prerequisites[i][0])
        }
    }
    console.log(graph)

    let queue = []
    // 找出入度为0的课程,也就是可以直接选择的课程
    for (let i = 0; i < degree.length; i++) {
        if (degree[i] == 0) {
            queue.push(i)
        }
    }

    while (queue.length) {
        let course = queue.shift()
        res++
        let NeedClass = graph[course]
        if (NeedClass && NeedClass.length) {
            for (let i = 0; i < NeedClass.length; i++) {
                degree[NeedClass[i]]--
                if (degree[NeedClass[i]] == 0) {
                    queue.push(NeedClass[i])
                }
            }
        }
    }

    return res == numCourses
};