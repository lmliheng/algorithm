/**
 * @路径总和3
 * 
 * 这个题 我还没解
 * 
 */


// 作者：灵茶山艾府
// 链接：https://leetcode.cn/problems/path-sum-iii/solutions/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
const pathSum = function (root, targetSum) {
    // key：从根到 node 的节点值之和
    // value：节点值之和的出现次数
    // 注意在递归过程中，哈希表只保存根到 node 的路径的前缀的节点值之和
    const cnt = new Map();
    cnt.set(0, 1); // 把 s[0] = 0 统计进来
    let ans = 0;

    // s 表示从根到 node 的父节点的节点值之和（node 的节点值尚未计入）
    function dfs(node, s) {
        if (node === null) {
            return;
        }

        s += node.val;
        // 把 node 当作路径的终点，统计有多少个起点
        ans += cnt.get(s - targetSum) ?? 0;

        cnt.set(s, (cnt.get(s) ?? 0) + 1); // cnt[s]++
        dfs(node.left, s);
        dfs(node.right, s);
        cnt.set(s, cnt.get(s) - 1); // 恢复现场（撤销 cnt[s]++）
    }

    dfs(root, 0);
    return ans;
};

