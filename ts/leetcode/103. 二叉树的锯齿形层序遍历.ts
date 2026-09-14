/**
 * @103. 二叉树的锯齿形层序遍历
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

let root: TreeNode = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3, null, new TreeNode(7)))

let level: number = 0
let res: number[][] = []
const bfs = (root: TreeNode | null): void => {
    if (!root) { return }
    let quene: TreeNode[] = [root]
    while (quene.length > 0) {
        console.log("队列信息：", quene.map(item => item.val))
        if (level % 2 === 0) {
            res.push([...quene.map(item => item.val)])
        } else {
            res.push([...quene.map(item => item.val)].reverse())
        }

        let l: number = quene.length //可拷贝长度后遍历完统一删除，也可以动态处理长度，边删元素边使用遍历
        for (let i = 0; i < l; i++) {
            let node: TreeNode = quene.shift()!
            if (node.left) { quene.push(node.left) }
            if (node.right) { quene.push(node.right) }
        }
        level++
    }
}
bfs(root)
console.log(res)

export {};
