/**
 * @二叉树的直径
 * 543
 * 
 * 直径是左右子树的最大边数，但是根节点不一定是树根
 * left记录的是左树的所有叶子节点到根节点的最大边长，right一样，
 * return返回的是从左右树的所有叶子节点到父节点的最大边长
 * 
 * root = [1,2,3,4,5,null,null,1]
 * 举个例子：对于根节点,left计算得3，right是1，直径是4
 * 
 */

export function diameterOfBinaryTree(root) {
    let res = 0
    const dfs = (node) => {
        if (!node) { return 0 }
        let left = dfs(node.left)
        let right = dfs(node.right)
        res = Math.max(res, left + right)
        // 返回的是到父节点的最大边长
        return Math.max(left, right) + 1
    }

    dfs(root)
    return res
};