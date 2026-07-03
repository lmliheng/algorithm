let graph = {
  A: { B: 1, C: 4 },
  B: { A: 1, C: 2, D: 5 },
  C: { A: 4, B: 2, D: 1 },
  D: { B: 5, C: 1 }
};

/**
 * @djistra
 */
let start = 'A';
const distances = {};
const visited = new Set();
const nodes = Object.keys(graph);

// 初始化距离：起点为0，其余为Infinity
for (let node of nodes) {
  distances[node] = node === start ? 0 : Infinity;
}

console.log(distances)
console.log(nodes)

// 选取当前未访问的距离最小节点 或者使用最小队列
// 这个有什么作用
nodes.sort((a, b) => distances[a] - distances[b]);

while (nodes.length) {
  const closestNode = nodes.shift();
  // 如果最小距离仍是Infinity，说明剩余节点不可达，可提前结束
  if (distances[closestNode] === Infinity) break;

  visited.add(closestNode);
  for (let neighbor in graph[closestNode]) {
    if (!visited.has(neighbor)) {
      const newDistance = distances[closestNode] + graph[closestNode][neighbor];
      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
      }
    }
  }
}

console.log('=================')
console.log(distances);
console.log('最小距离是：', distances['D']);