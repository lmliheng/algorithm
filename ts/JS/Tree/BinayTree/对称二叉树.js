/**
 * @对称二叉树
 * 
 * 递归。
 * 递归怎么找，先实现一个s功能，A,B树对称，
 * 那么当AB均为空，那么对称，（到了叶子节点的时候，写的时候看不出来）
 * 在A,B同时不为空的前提下，A，B有一个为空   !A||！B为true，不对称，
 * 在此基础上，AB都不为空时，值不相同则不对称，
 * 最后返回 return s(A.left,B.right)&&s(A.right,B.left)
 * 
 */
function isSymmetric(root) {
    if (!root) { return false }
    const symmetric = (l, r) => {
        if (!l && !r) {
            return true
        }
        if (!l || !r || l.val !== r.val) {
            return false
        }
        return symmetric(l.left, r.right) && symmetric(l.right, r.left)
    }
    return symmetric(root.left, root.right)

};