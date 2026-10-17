/**
 * @根据中序和后序遍历构造二叉树
 * 前序遍历生成3部分，分别是根节点，左右子树（按顺序排成数组），中后遍历一样
 * 
 */
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}


let inorder = [2,1]
let postorder = [2,1]

// 左树必定有1个节点 右树3个

const CreateBTree = (inorder, postorder) => {
    if(inorder.length===0){return null}
    // 长度为1 返回undefined ，TreeNode处理成null
    let res = new TreeNode(postorder[postorder.length - 1])
    
    if(inorder.length===1){return res} // 左右树大小必定相等，一旦只剩一个元素就直接返回这个元素节点
    for (let i = 0; i < inorder.length; i++) {
        if (inorder[i] === res.val) {
            res.left = CreateBTree(inorder.slice(0, i), postorder.slice(0, i))
            res.right = CreateBTree(inorder.slice(i + 1), postorder.slice(i, postorder.length - 1))
        }
    }
    return res
}

console.log(JSON.stringify(CreateBTree(inorder,postorder)))



