import { g1 } from "../迪杰斯特拉/图的表示.js"
console.log(g1)
let n = g1.length

let visit = new Array(n).fill(false)

const graph_dfs = (v, visit) => {
    console.log('当前节点：', v)
    visit[v] = true
    for (let i = 0; i < n; i++) {
        if (!visit[i] && g1[v][i] === 1) {
            graph_dfs(i, visit)
        }
    }
}
// 0,1,2,3,4,5个节点
for (let i = 0; i < n; i++) {
    if (!visit[i]) {
        graph_dfs(i, visit)
    }
}