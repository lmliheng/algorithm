"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinaryTree = void 0;
/**
 * @二叉树
 */
class BinaryTree {
    constructor(val, left, right) {
        this.val = val === undefined ? null : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}
exports.BinaryTree = BinaryTree;
