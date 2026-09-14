/**
 * @222. 完全二叉树的节点个数
 */
function countNodes(root: TreeNode | null): number {
    if (root === null) return 0
    return 1 + countNodes(root.left) + countNodes(root.right)
}
