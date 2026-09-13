// 收集节点
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

let root = new TreeNode(1, new TreeNode(2, new TreeNode(3, null, null), new TreeNode(4, null, null)), new TreeNode(5, null, new TreeNode(6, null, null)))

if (root === null) {
    return null
}
let arr = []
const bfs = (root) => {
    if (root === null) {
        return
    }
    arr.push(root)
    if (root.left) {
        bfs(root.left)
    }
    if (root.right) {
        bfs(root.right)
    }

}

bfs(root)

// 重新连接节点
for (let i = 0; i < arr.length - 1; i++) {
    arr[i].left = null;
    arr[i].right = arr[i + 1];
}

// 最后一个节点的左右子树设为null
if (arr.length > 0) {
    arr[arr.length - 1].left = null;
    arr[arr.length - 1].right = null;
}

console.log(root)

let a=1