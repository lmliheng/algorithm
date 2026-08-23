/**
 * @二叉搜索树中第K小的元素
 * 
 * 1. DFS 存储节点值后排序取前k位
 * 2. DFS 二叉搜索树的中序遍历的节点值是单调递增的，省去排序的过程
 * 
 */


/**
 * @dfs
 * 暴力 DFS，存储节点值后排序取前k位。top-k可以用堆
 */
function kthSmallest(root, k) {
    let arr = []
    const dfs = (node) => {
        if (!node) {
            return
        }
        arr.push(node.val)
        dfs(node.left)
        dfs(node.right)
    }
    dfs(root)
    return arr.sort((a, b) => a - b)[k - 1]
};


/**
 * @二叉搜索树的中序遍历的节点值是单调递增的
 */
function kthSmallest1(root, k) {
    let arr = []
    const dfs = (node) => {
        if (!node) {
            return
        }
        dfs(node.left)
        arr.push(node.val)
        dfs(node.right)
    }
    dfs(root)
    return arr[k - 1]
};

