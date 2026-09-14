/**
 * @101. 对称二叉树
 */

class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
function isSymmetric(root: TreeNode | null): boolean {
    const bfs = (l: TreeNode | null, r: TreeNode | null): boolean => {
        if (r == null && l == null) {
            return true
        }
        if (r == null || l == null) {
            return false
        }
        if (r.val !== l.val) {
            return false
        }
        return bfs(l.left, r.right) && bfs(l.right, r.left)
    }

    if (root === null) {
        return true
    }
    return bfs(root.left, root.right)
}

let root: TreeNode = new TreeNode(1, new TreeNode(2, new TreeNode(3), new TreeNode(4)), new TreeNode(2))

console.log(isSymmetric(root))

export {};
