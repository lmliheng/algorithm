/**
 * @133. 克隆图
 */

class GraphNode {
    val: number;
    neighbors: GraphNode[];
    constructor(val?: number, neighbors?: GraphNode[]) {
        this.val = val === undefined ? 0 : val;
        this.neighbors = neighbors === undefined ? [] : neighbors;
    }
}

function cloneGraph(node: GraphNode | null): GraphNode | null {
    // 克隆节点 克隆关系
    const visited = new Map<GraphNode, GraphNode>()
    //dfs
    const dfs = (node: GraphNode | null): void => {
        if (!node) {
            return
        }
        const clone: GraphNode = new GraphNode(node.val)
        console.log(node.val)
        visited.set(node, clone);
        (node.neighbors || []).forEach((c: GraphNode) => {
            if (!visited.has(c)) {
                dfs(c)
            }
            clone.neighbors.push(visited.get(c)!)
        })
    }
    dfs(node)

    return visited.get(node!) ?? null
}

const node1: GraphNode = new GraphNode(1, [])
const node2: GraphNode = new GraphNode(2, [])
const node3: GraphNode = new GraphNode(3, [])
const node4: GraphNode = new GraphNode(4, [])
node1.neighbors = [node2, node4]
node2.neighbors = [node1, node3]
node3.neighbors = [node2, node4]
node4.neighbors = [node3, node1]

// cloneGraph(node1)
console.log(cloneGraph(node1))

export {};
