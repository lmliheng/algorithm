function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}
// 无重复元素
let preorder = [3, 9, 20, 15, 7]
let inorder = [9, 3, 15, 20, 7]

const buildT = (preorder, inorder) => {
    if (preorder.length === 0 || inorder.length === 0) {
        return null
    }
    let root = new TreeNode(preorder[0])

    for (let i = 0; i < inorder.length; i++) {
        if (inorder[i] === preorder[0]) {
            let pre_l = preorder.slice(1, 1 + i)
            let pre_r = preorder.slice(1 + i)
            let in_l = inorder.slice(0, i)
            let in_r = inorder.slice(i + 1)
            root.left = buildT(pre_l, in_l)
            root.right = buildT(pre_r, in_r)

        }
    }
    return root

}
let res=buildT(preorder, inorder)
console.log(res)
let a=1