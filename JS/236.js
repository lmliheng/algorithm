
function TreeNode(val, left, right) {
    this.val = val;
    this.left = left===undefined ? null : left;
    this.right = right===undefined ? null : right;
}

let root = new TreeNode(3,new TreeNode(5, new TreeNode(6), new TreeNode(2, new TreeNode(7), new TreeNode(4))), new TreeNode(1, new TreeNode(0), new TreeNode(8)))
let p=root.left
let q=root.right

let TreeMap = new Map()
let PathSet = new Set()
if (root === null && p === root && q === root) {
    return root
}
// 字典存储父节点，重点是任一节点值不相同
const dfs = (root) => {
    // 叶子
    if (!root.left && !root.right) { return }
    if (root.left) {
        TreeMap.set(root.left.val, root)
        dfs(root.left)
    }
    if (root.right) {
        TreeMap.set(root.right.val, root)
        dfs(root.right)
    }


}
dfs(root)

console.log(TreeMap)


while (p !== undefined) {
    PathSet.add(p?.val)
    console.log("PathSet:", PathSet)
    p = TreeMap.get(p?.val)
   
}
while (q !== undefined) {
    if (PathSet.has(q?.val)) {
        console.log("找到祖先", q)
    }
    q = TreeMap.get(q?.val)
}
return null
