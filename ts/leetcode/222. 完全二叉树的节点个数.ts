/**
 * @difficulty easy
 * @tags 树,递归
 * @time O(n)
 * @space O(n)
 * @note 递归统计所有节点，未利用完全二叉树性质
 * @222. 完全二叉树的节点个数
 */
function countNodes(root: TreeNode | null): number {
    if (root === null) return 0
    return 1 + countNodes(root.left) + countNodes(root.right)
}
