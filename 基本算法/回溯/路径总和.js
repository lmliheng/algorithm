/**
 * @路径总和2
 */
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

let root = new TreeNode(5,
    new TreeNode(4, new TreeNode(11, new TreeNode(7), new TreeNode(2))),
    new TreeNode(8, new TreeNode(13), new TreeNode(4, new TreeNode(5), new TreeNode(1)))
)
let targetSum = 22

function ArrSum(arr) {
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    return sum
}

if (!root) { return [] }
let res = []
let path = [] // 放外部
// 回溯
const dfs = (node) => {
    if (!node) { return }
    path.push(node.val)
    // 叶子节点终止，不用写null节点
    if ((!node.left) && (!node.right)) {
        let sum = ArrSum(path)
        if (sum === targetSum) {
            res.push([...path])
        }
       // return
    } else {
        dfs(node.left)
        dfs(node.right)
    }

    path.pop()
}

dfs(root, 0)



console.log(res)

