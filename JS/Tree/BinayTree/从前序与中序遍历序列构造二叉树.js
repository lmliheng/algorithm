import {TreeNode} from './BinayTree.js'

/**
 * @从前序与中序遍历序列构造二叉树
 */

/**
 * 
 * @递归
 */
export function buildTree(preorder, inorder) {
    if (preorder.length == 0) {
        return null
    }
    let tree = new TreeNode(preorder[0])
    let index = inorder.indexOf(preorder[0])
    tree.left = buildTree(preorder.slice(1, index+1), inorder.slice(0, index))
    tree.right = buildTree(preorder.slice(index + 1), inorder.slice(index + 1))
    return tree
};

// console.log(buildTree([3,9,20,15,7],[9,3,15,20,7]))