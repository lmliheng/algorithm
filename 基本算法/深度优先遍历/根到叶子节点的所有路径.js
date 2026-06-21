class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

let root = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode((5))), new TreeNode(3, new TreeNode(6), new TreeNode(7)))

const result = [];

function dfs(node, path) {
    if (!node) return; // 空节点直接返回
    // 将当前节点值加入路径
    path.push(node.val);
    // 如果是叶子节点，将路径转为字符串存入结果
    if (!node.left && !node.right) {
        result.push([...path]);
    } else {
        // 递归遍历左右子树
        dfs(node.left, path);
        dfs(node.right, path);
    }
    // 回溯：移除当前节点，恢复路径状态
    path.pop();
}

dfs(root, []);

console.log(result) // [ [ 1, 2, 4 ], [ 1, 2, 5 ], [ 1, 3, 6 ], [ 1, 3, 7 ] ]


