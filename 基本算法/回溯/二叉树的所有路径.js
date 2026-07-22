

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
 * @二叉树的所有路径
 */

let root = new TreeNode(1, new TreeNode(2, null, new TreeNode(5)), new TreeNode(3))

if (!root) { return [] }
let res = []
let path = []

const dfs = (node) => {
    if (!node) { return }

    path.push(node.val)

    if ((!node.left) && (!node.right)) {
        res.push(path.join('->'))
        // return 
    } else {
        dfs(node.left)
        dfs(node.right)
    }

    path.pop()
}
dfs(root)
console.log(res)
