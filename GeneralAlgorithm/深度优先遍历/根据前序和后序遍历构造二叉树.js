/**
 * 根据前序和后序遍历构造二叉树
 */
// 前序遍历的特点是：第一个是根节点，23个是左右节点。
// 数组一个索引i的元素的左子节点是2i+1,右节点是2i+2，父节点是math.floor(i/2)

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

let preorder = [1, 2, 4, 5, 3, 6]
let postorder = [4, 5, 2, 6, 3, 1]

const CreateBtree = (preorder, postorder) => {
    if (preorder.length === 0) { return null }
    let n = preorder.length
    let res = new TreeNode(preorder[0])
    if (preorder.length === 1) { return res }
    // 前序遍历索引1必定是左节点，后序遍历索引n-2必定是右节点
    for (let i = 0; i < n; i++) {
        // 左子树根
        if (postorder[i] === preorder[1]) {
            res.left = CreateBtree(preorder.slice(1, 2 + i), postorder.slice(0, i + 1))
            res.right = CreateBtree(preorder.slice(i + 2), postorder.slice(i + 1, n - 1))
        }
    }

    return res
}

console.log(JSON.stringify(CreateBtree(preorder, postorder)))