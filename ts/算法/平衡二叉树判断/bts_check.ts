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
const isBalanced = function (root: TreeNode | null): boolean {
    if (!root) return true
    return Math.abs(depth(root.left) - depth(root.right)) <= 1
        && isBalanced(root.left)
        && isBalanced(root.right)
}


const depth = function (node: TreeNode | null): number {
    if (!node) return -1
    return 1 + Math.max(depth(node.left), depth(node.right))
}