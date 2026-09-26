/**
 * @划分等和序列
 * 是在视频号看到的题目
 * 入参一个数组，数字k，数组target，如果数组能划分为k个以上的和为target的块，返回ture
 */

/**
 * 
 * @回溯剪枝
 */
function canPartitionKSubsets1(nums: number[], k: number): boolean {
    const total = nums.reduce((a, b) => a + b, 0);
    if (total % k !== 0) return false;

    const target = total / k;
    const n = nums.length;

    // 降序排序，大的先放，剪枝效果更好
    nums.sort((a, b) => b - a);

    // 最大元素超过目标值，不可能
    if (nums[0] > target) return false;

    // 记录每个元素是否已被使用
    const used = new Array(n).fill(false);

    function backtrack(start: number, curSum: number, completed: number): boolean {
        // 已经完成 k-1 组，最后一组自然成立
        if (completed === k - 1) return true;

        // 当前组凑满了，开始下一组
        if (curSum === target) {
            return backtrack(0, 0, completed + 1);
        }

        for (let i = start; i < n; i++) {
            if (used[i]) continue;
            if (curSum + nums[i] > target) continue;

            used[i] = true;
            if (backtrack(i + 1, curSum + nums[i], completed)) {
                return true;
            }
            used[i] = false;

            // 核心剪枝：当前组的第一个元素都无法成功放置，整条路走不通
            if (curSum === 0) return false;

            // 跳过相同值的元素，避免重复搜索
            while (i + 1 < n && nums[i] === nums[i + 1]) {
                i++;
            }
        }

        return false;
    }

    return backtrack(0, 0, 0);
}


/**
 * 
 * 
 * @错误的解法，这是：划分连续子数组的解法
 * 
 * 复杂度也高
 * 但子集划分不是连续分段，元素可以任意打乱重组，不是从头到尾顺序取就能行
 * 比如 [1, 2, 3, 4] 分成两组和为5：可以是 [1,4] 和 [2,3]，但顺序扫描永远扫不到
 */
function canPartition(nums: number[], k: number) {
    let sum = nums.reduce((acc, val) => acc + val, 0)
    let n = nums.length
    // 分成i个段
    for (let i = 1; i <= n; i++) {
        if (sum % i !== 0) {
            continue
        }
        let targetSum = sum / i
        let currentSum = 0
        let count = 0
        for (let j = 0; j < n; j++) {

            if (currentSum + nums[j] == currentSum) {
                currentSum = 0
                count++
                continue
            } else if (currentSum + nums[j] < currentSum) {
                currentSum += nums[j]
            } else {
                break
            }

            if (count == k) {
                return true
            }
        }
    }
    return false

}