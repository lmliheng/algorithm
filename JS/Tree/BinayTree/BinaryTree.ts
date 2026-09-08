/**
 * @二叉树
 */
export class BinaryTree {
    val: any
    left: BinaryTree | null
    right: BinaryTree | null
    constructor(val: any, left?: BinaryTree | undefined, right?: BinaryTree | undefined) {
        this.val = val === undefined ? null : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}