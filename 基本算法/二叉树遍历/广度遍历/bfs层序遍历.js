function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

let root = new TreeNode(3, new TreeNode(9, new TreeNode(1)), new TreeNode(20, new TreeNode(15), new TreeNode(7)))

let res = []

const bfs = (root) => {
    let quene = [root]
    while (quene.length) {
        let arr = []
        for (let i = 0; i < quene.length; i++) {
            arr.push(quene[i].val)
        }
        res.push(arr)
        // 每一轮遍历时，将队列中的节点全部取出，
        // 计算这些节点的数量以及它们的节点值之和，并计算这些节点的平均值，
        // 然后将这些节点的全部非空子节点加入队列，重复上述操作直到队列为空，遍历结束。
        let queneLength = quene.length

        for (let i = 0; i < queneLength; i++) {
            let node = quene.shift()
            if (node.left) {
                quene.push(node.left)
            }
            if (node.right) {
                quene.push(node.right)
            }
        }

    }

}

bfs(root)
console.log(res)
