import { g1, undirectedMatrix } from "../迪杰斯特拉/图的表示.js"
console.log(g1, undirectedMatrix)
let n = undirectedMatrix.length

let visit = new Array(n).fill(false)

const graph_dfs = (v, visit) => {
    console.log('当前节点：', v+1)
    visit[v] = true
    for (let i = 0; i < n; i++) {
        if (!visit[i] && undirectedMatrix[v][i] === 1) {
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