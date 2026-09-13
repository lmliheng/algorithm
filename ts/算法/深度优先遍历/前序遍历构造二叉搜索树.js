
/**
 * @前序遍历构造二叉搜索树
 * 搜索树应该满足：每个节点左树节点均小于根节点值，右树大于
 * 
 * 左子树不存在的情况，右子树不存在...
 */
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}
let preorder = [4, 2]
//[8, 5, 1, 7, 10, 12]

const CreateBTree = (preorder) => {
    if (preorder.length === 0) { return null }
    // 右子树不存在时r取length
    let r=preorder.length
    for (let i = 1; i < preorder.length; i++) {
        if (preorder[0] < preorder[i]) {
            r = i
            break
        }
    }

    let root = new TreeNode(preorder[0])
    if (preorder.length === 1) { return root }
    // to solved:

    root.left = CreateBTree(preorder.slice(1, r))
    root.right = CreateBTree(preorder.slice(r))
    return root
}

console.log(JSON.stringify(CreateBTree(preorder)))