/**
 * @验证二叉搜索树
 * 
 * 对每个节点进行上下限判断，
 * 二叉搜索树的每一个节点的值：
 * 左节点小于父节点值，右节点大于父节点值，
 * 而且min,max在更深的子节点里取决于上面的遍历方向
 * 
 * 这道题需要对二叉搜索树有足够的了解
 * 
 */
function isValidBST(root) {
    const valid = (node, min, max) => {
        if (node == null) return true;
        if (node.val <= min || node.val >= max) return false;
        return valid(node.left, min, node.val) && valid(node.right, node.val, max)
    }
    return valid(root, -Infinity, Infinity);
};