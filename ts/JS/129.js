function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

let root=new TreeNode(1,new TreeNode(2),new TreeNode(3))

if (root === null) {
    return 0
}
let sum = 0

const dfs = (node, val) => {
    if (node === null) {
        return
    }
    // 叶子节点
    if (node.left === null && node.right === null) {
        sum += val
    }

    if (node.left) {
        console.log('',)
        dfs(node.left, val * 10 + node.left.val)
    }
    if (node.right) {
        dfs(node.right, val * 10 + node.right.val)
    }
}

dfs(root, root.val)

console.log(sum)