
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
    arr.push(root.val)
    if (root.left) {
        bfs(root.left)
    }
    if (root.right) {
        bfs(root.right)
    }

}

bfs(root)

root = new TreeNode(arr[0])
let n = 0

const CreateTree = (root) => {
    if (n >= arr.length - 1) {
        return
    }
    root.right = new TreeNode(arr[n+1])
    n++
    CreateTree(root.right)

}
CreateTree(root)


console.log(arr)
console.log(root)

let a = 1