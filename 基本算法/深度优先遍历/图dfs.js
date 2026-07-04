let n = 4
let roads = [[1, 2, 9], [2, 3, 6], [2, 4, 5], [1, 4, 7]]
const vis = Array.from({ length: n + 1 }, () => false);
const graph = Array.from({ length: n + 1 }, () => []);
for (const [u, v, dis] of roads) {
    graph[u].push({ v, dis });
    graph[v].push({ v: u, dis });
}


let ans = Infinity;
const dfs = (u) => {
    if (vis[u] === false) {
        vis[u] = true;
    }

    for (const { v, dis } of graph[u]) {
        ans = Math.min(ans, dis);
        if (vis[v] === false) {
            dfs(v);
        }
    }
};

dfs(1);
console.log(ans)