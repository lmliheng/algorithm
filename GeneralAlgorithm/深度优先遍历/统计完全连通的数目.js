/**
 * @统计完全连通的数目
 * dfs
 * E=（V-1）V/2
 * 
 */
let n = 6
let edges = [[0, 1], [0, 2], [1, 2], [3, 4]]
let graph = Array.from({ length: n }, () => [])
// new Array(n).fill([])会让数组元素共用一个地址
for (let [u, v] of edges) {
    graph[u].push(v)
    graph[v].push(u)
}
console.log(graph)
let visit = new Array(n).fill(false)
let res = 0


for (let i = 0; i < n; i++) {

    if (!visit[i]) {
        let V = 0
        let E = 0
        let stack = [i]
        visit[i] = true

        //使用栈实现的深度搜索...
        while (stack.length > 0) {
            let u = stack.pop()
            V++
            E += graph[u].length
            for (const v of graph[u]) {
                if (!visit[v]) {
                    visit[v] = true
                    stack.push(v)
                }
            }
        }
        if (E === V * (V - 1)) {
            res++
        }
    }
}

console.log(res)
