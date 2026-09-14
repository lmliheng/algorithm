/**
 * @114. 二叉树展开为链表（解法二）
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

// 收集节点
let root: TreeNode | null = new TreeNode(1, new TreeNode(2, new TreeNode(3, null, null), new TreeNode(4, null, null)), new TreeNode(5, null, new TreeNode(6, null, null)))

if (root === null) {
    console.log(null)
} else {
    let arr: TreeNode[] = []
    const bfs = (root: TreeNode | null): void => {
        if (root === null) {
            return
        }
        arr.push(root)
        if (root.left) {
            bfs(root.left)
        }
        if (root.right) {
            bfs(root.right)
        }
    }

    bfs(root)

    // 重新连接节点
    for (let i = 0; i < arr.length - 1; i++) {
        arr[i].left = null;
        arr[i].right = arr[i + 1];
    }

    // 最后一个节点的左右子树设为null
    if (arr.length > 0) {
        arr[arr.length - 1].left = null;
        arr[arr.length - 1].right = null;
    }

    console.log(root)
}

export {};
