/**
 * @129. 求根节点到叶节点数字之和
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

let root: TreeNode | null = new TreeNode(1, new TreeNode(2), new TreeNode(3))

if (root === null) {
    console.log(0)
} else {
    let sum: number = 0

    const dfs = (node: TreeNode | null, val: number): void => {
        if (node === null) {
            return
        }
        // 叶子节点
        if (node.left === null && node.right === null) {
            sum += val
        }

        if (node.left) {
            dfs(node.left, val * 10 + node.left.val)
        }
        if (node.right) {
            dfs(node.right, val * 10 + node.right.val)
        }
    }

    dfs(root, root.val)

    console.log(sum)
}

export {};
