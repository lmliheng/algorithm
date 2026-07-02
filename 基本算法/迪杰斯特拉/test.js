let graph = {
  A: { B: 1, C: 4 },
  B: { A: 1, C: 2, D: 5 },
  C: { A: 4, B: 2, D: 1 },
  D: { B: 5, C: 1 }
};

let start = 'A';

const distances = {};
const visited = new Set();
const nodes = Object.keys(graph);

// 初始化距离：起点为0，其余为Infinity
for (let node of nodes) {
  distances[node] = node === start ? 0 : Infinity;
}

while (nodes.length) {
  // 步骤1：选取当前未访问的距离最小节点
  nodes.sort((a, b) => distances[a] - distances[b]);
  const closestNode = nodes.shift();

  // 如果最小距离仍是Infinity，说明剩余节点不可达，可提前结束
  if (distances[closestNode] === Infinity) break;
  visited.add(closestNode);

  // 步骤2：松弛操作（更新邻居距离）
  for (let neighbor in graph[closestNode]) {
    if (!visited.has(neighbor)) {
      const newDistance = distances[closestNode] + graph[closestNode][neighbor];
      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
      }
    }
  }
}


console.log(distances);
console.log('最小距离是：', distances['D']);