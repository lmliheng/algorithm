/**
 * @二叉树
 */
export class BinaryTree {
    val;
    left;
    right;
    constructor(val, left, right) {
        this.val = val === undefined ? null : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}
