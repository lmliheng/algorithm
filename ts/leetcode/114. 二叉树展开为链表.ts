/**
 * @114. 二叉树展开为链表
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

let root: TreeNode | null = new TreeNode(1, new TreeNode(2, new TreeNode(3, null, null), new TreeNode(4, null, null)), new TreeNode(5, null, new TreeNode(6, null, null)))

if (root === null) {
    console.log(null)
} else {
    let arr: number[] = []
    const bfs = (root: TreeNode | null): void => {
        if (root === null) {
            return
        }
        arr.push(root.val)
        if (root.left) {
            bfs(root.left)
        }
        if (root.right) {
            bfs(root.right)
        }
    }

    bfs(root)

    root = new TreeNode(arr[0])
    let n: number = 0

    const CreateTree = (root: TreeNode): void => {
        if (n >= arr.length - 1) {
            return
        }
        root.right = new TreeNode(arr[n+1])
        n++
        CreateTree(root.right)
    }
    CreateTree(root)

    console.log(arr)
    console.log(root)
}

export {};
