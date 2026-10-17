/**
 * @将有序数组转换为平衡二叉搜索树
 * 
 */
function sortedArrayToBST(nums) {
    let n = nums.length
    if (!n) { return null }
    const dfs = (l, r) => {
        if (l > r) {
            return null
        }
        let mid = Math.floor((r + l) / 2)
        let tree = new TreeNode(nums[mid])
        tree.left = dfs(l, mid - 1)
        tree.right = dfs(mid + 1, r)
        return tree

    }
    return dfs(0, n - 1)

};