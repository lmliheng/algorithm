/**
 * @105. 从前序与中序遍历序列构造二叉树
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

// 无重复元素
let preorder: number[] = [3, 9, 20, 15, 7]
let inorder: number[] = [9, 3, 15, 20, 7]

const buildT = (preorder: number[], inorder: number[]): TreeNode | null => {
    if (preorder.length === 0 || inorder.length === 0) {
        return null
    }
    let root: TreeNode = new TreeNode(preorder[0])

    for (let i = 0; i < inorder.length; i++) {
        if (inorder[i] === preorder[0]) {
            let pre_l: number[] = preorder.slice(1, 1 + i)
            let pre_r: number[] = preorder.slice(1 + i)
            let in_l: number[] = inorder.slice(0, i)
            let in_r: number[] = inorder.slice(i + 1)
            root.left = buildT(pre_l, in_l)
            root.right = buildT(pre_r, in_r)
        }
    }
    return root
}

let res: TreeNode | null = buildT(preorder, inorder)
console.log(res)

export {};
