/**
 * @二叉树的右视图
 * 
 */


/**
 * @BFS层序遍历
 * 模板题目
 */
function rightSideView(root) {
    if (!root) { return [] }
    let res = []
    let queue = [root]
    while (queue.length) {
        let len = queue.length
        res.push(queue[len - 1].val)
        for (let i = 0; i < len; i++) {
            let node = queue.shift()
            if (node.left) {
                queue.push(node.left)
            }
            if (node.right) {
                queue.push(node.right)
            }
        }
    }
    return res
};