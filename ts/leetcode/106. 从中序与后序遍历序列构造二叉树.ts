/**
 * @106. 从中序与后序遍历序列构造二叉树
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
let inorder: number[] = [1, 2]
let postorder: number[] = [2, 1]
// 同理
const buildT = (inorder: number[], postorder: number[]): TreeNode | null => {
    if (postorder.length === 0 || inorder.length === 0) {
        return null
    }
    let root: TreeNode = new TreeNode(postorder[postorder.length - 1])

    for (let i = 0; i < inorder.length; i++) {
        if (inorder[i] === root.val) {
            let post_l: number[] = postorder.slice(0, i)
            let post_r: number[] = postorder.slice(i, postorder.length - 1)
            let in_l: number[] = inorder.slice(0, i)
            let in_r: number[] = inorder.slice(i + 1)
            root.left = buildT(in_l, post_l)
            root.right = buildT(in_r, post_r)

            console.log(post_l, post_r, in_l, in_r)
        }
    }
    return root
}

console.log(buildT(inorder, postorder))

export {};
