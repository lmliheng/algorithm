/**
 * @二叉树中的最大路径和
 * 和二叉树的直径解法类似
 * DFS 但是实战很难打出
 */
function maxPathSum(root) {
    let res = -10000000
    const dfs = (node) => {
        if (!node) {
            return 0
        }
        let left = Math.max(dfs(node.left), 0)
        let right = Math.max(dfs(node.right), 0)
        res = Math.max(res, node.val + left + right)
        return node.val + Math.max(left, right)
    }
    dfs(root)
    return res
};