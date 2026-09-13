
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}
// 无重复元素
let inorder = [1,2]
let postorder = [2,1]
// 同理
    const buildT = (inorder, postorder) => {
        if (postorder.length === 0 || inorder.length === 0) {
            return null
        }
        let root = new TreeNode(postorder[postorder.length - 1])

        for (let i = 0; i < inorder.length; i++) {
            if (inorder[i] === root.val) {
                let post_l = postorder.slice(0, i)
                let post_r = postorder.slice(i, postorder.length - 1)
                let in_l = inorder.slice(0, i)
                let in_r = inorder.slice(i + 1)
                root.left = buildT( in_l,post_l)
                root.right = buildT( in_r,post_r)

                console.log(post_l,post_r,in_l,in_r)

            }
        }
        return root

    }
   console.log(buildT(inorder,postorder))