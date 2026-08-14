/**
 * @二叉树的直径
 * 543
 * 直径是左右子树的最大边数，但是根节点不一定是树根
 * 
 */

export function diameterOfBinaryTree(root) {
    let res = 0
    const dfs = (node) => {
        if (!node) { return 0 }
        let left = dfs(node.left)
        let right = dfs(node.right)
        res = Math.max(res, left + right)
        return Math.max(left, right) + 1
    }

    dfs(root)
    return res
};