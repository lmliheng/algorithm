/**
 * @完全二叉树的节点数
 * 
 * 利用完全二叉树的性质，可以在 O(log_2(n)) 时间内求出节点数，而不是暴力 O(n)
 */
function countNodes(root) {
    if (!root) return 0;
    let leftHeight = 0, rightHeight = 0;
    let node = root;
    while (node) { leftHeight++; node = node.left; }
    node = root;
    while (node) { rightHeight++; node = node.right; }

    // 左右高度相等 → 是满二叉树，直接用公式
    if (leftHeight === rightHeight) return Math.pow(2, leftHeight) - 1;

    // 否则递归左右子树
    return 1 + countNodes(root.left) + countNodes(root.right);
}