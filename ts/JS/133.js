/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {_Node} node
 * @return {_Node}
 */


function _Node(val, neighbors) {
    this.val = val === undefined ? 0 : val;
    this.neighbors = neighbors === undefined ? [] : neighbors;
};

var cloneGraph = function (node) {

    // 克隆节点 克隆关系
    const visited = new Map()
    //dfs
    const dfs = (node) => {
        if (!node) {
            return
        }
        const clone = new _Node(node.val)
        console.log(node.val)
        visited.set(node, clone);
        (node.neighbors || []).forEach((c) => {
            if (!visited.has(c)) {
                dfs(c)
                // clone.neighbors.push(visited.get(c))
            }
            clone.neighbors.push(visited.get(c))
        })

    }
    dfs(node)

    return visited.get(node)

};

const node1 = new _Node(1, [])
const node2 = new _Node(2, [])
const node3 = new _Node(3, [])
const node4 = new _Node(4, [])
node1.neighbors = [node2, node4]
node2.neighbors = [node1, node3]
node3.neighbors = [node2, node4]
node4.neighbors = [node3, node1]

// cloneGraph(node1)
console.log(cloneGraph(node1))