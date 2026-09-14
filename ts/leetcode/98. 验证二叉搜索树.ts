/**
 * @98. 验证二叉搜索树
 */

class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

let root: TreeNode = new TreeNode(4, new TreeNode(2), new TreeNode(5, null, new TreeNode(6)))

// new TreeNode(5, new TreeNode(1), new TreeNode(4,new TreeNode(3),new TreeNode(6)))
console.log(root)
if (!root) { console.log(true) }

let arr: number[] = []
let res: boolean = true
const dfs = (root: TreeNode | null): void => {
    if (!root) { return }
    if (root.left) { dfs(root.left) }
    console.log(root.val)
    arr.push(root.val)
    if (root.right) { dfs(root.right) }
}
dfs(root)

for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] >= arr[i+1]) {
        // return false
    }
}
console.log(res)

export {};
