
/**
 * @lc3620 恢复网格路径
 * @param {number[][]} edges
 * @param {boolean[]} online
 * @param {number} k
 * @return {number}
 */
var findMaxPathScore = function (edges, online, k) {
    const n = online.length;

    // 1. 过滤掉包含离线节点的边 
    const validEdges = edges.filter(([u, v]) => online[u] && online[v]);

    // 2. 按成本排序（降序），用于二分查找
    const costs = [...new Set(validEdges.map(e => e[2]))].sort((a, b) => b - a);

    // 3. 构建邻接表
    const buildGraph = (minCost) => {
        const graph = new Array(n).fill(null).map(() => []);
        for (const [u, v, cost] of validEdges) {
            if (cost >= minCost) {
                graph[u].push(v);
            }
        }
        return graph;
    };

    // 4. DFS检查是否存在有效路径
    const hasValidPath = (graph, maxCost) => {
        const visited = new Array(n).fill(false);
        const stack = [[0, 0]]; // [node, totalCost]

        while (stack.length > 0) {
            const [node, totalCost] = stack.pop();

            if (node === n - 1) return true;
            if (visited[node]) continue;
            visited[node] = true;

            for (const next of graph[node]) {
                // 计算这条边的成本
                const edgeCost = validEdges.find(e => e[0] === node && e[1] === next)[2];
                const newTotal = totalCost + edgeCost;

                if (newTotal <= maxCost && !visited[next]) {
                    stack.push([next, newTotal]);
                }
            }
        }

        return false;
    };

    // 5. 二分查找最大最小边成本
    let left = 0;
    let right = costs.length - 1;
    let result = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const minEdgeCost = costs[mid];
        const graph = buildGraph(minEdgeCost);

        if (hasValidPath(graph, k)) {
            result = minEdgeCost;
            right = mid - 1; // 尝试更大的最小边成本
        } else {
            left = mid + 1; // 需要降低最小边成本
        }
    }

    return result;
};