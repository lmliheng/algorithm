/**
 * @翻转二叉树
 * 
 * 递归
 */


/**
 * 
 * @递归
 * 写法1 返回叶子节点
 * 
 */
function invertTree(root) {
    if (!root) {
        return null
    }
    if (!root.left && !root.right) {
        return root
    }
    let temp = root.left
    root.left = invertTree(root.right)
    root.right = invertTree(temp)
    return root
};



/**
 * 
 * 写法二
 * 
 */

function invertTree1(root) {
    if (root === null) {
        return null;
    }
    const temp = root.left;
    root.left = root.right;
    root.right = temp;
    invertTree(root.left);
    invertTree(root.right);
    return root;
};