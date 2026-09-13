/**
* Definition for a binary tree node.
* class TreeNode {
*     val: number
*     left: TreeNode | null
*     right: TreeNode | null
*     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
*         this.val = (val===undefined ? 0 : val)
*         this.left = (left===undefined ? null : left)
*         this.right = (right===undefined ? null : right)
*     }
* }
*/


class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}


// let root = new TreeNode(3, new TreeNode(20, new TreeNode(15), new TreeNode(7)), new TreeNode(9))

let root = new TreeNode(1, new TreeNode(2))
if (root === null) {
    console.log('平衡')
}

const bfs = (tree: TreeNode | null, level: number) => {
    console.log(tree, level)
    if (tree === null) {
        return
    }
    if (tree.left === null && tree.right === null) {
        levelArr.push(level)
        console.log("叶子节点push入层级", level)
        return
    } else {
        bfs(tree.left, level + 1)
        bfs(tree.right, level + 1)
    }

}

let levelArr: number[]
levelArr = []

bfs(root, 1)
// console.log(levelArr)
let sortarr = levelArr.sort((a, b) => a - b)
console.log(sortarr)
if (sortarr[sortarr.length - 1] - sortarr[0] < 2) {
    console.log('平衡')
} else if (sortarr.length === 1 && sortarr[0] <= 2) {
    console.log('平衡')
}else {
    console.log('不平衡')
}



