/**
 * @最长重复子数组
 * 花了很多时间,构建了dp，
 * 但是不知道该从末尾开始对比，走了弯路
 */
export function findLength(nums1, nums2) {
    let res = 0
    let n1 = nums1.length
    let n2 = nums2.length
    //dp[i][j] 值是两个索引开始的公共子数组的长度
    let dp = Array.from({ length: n1 + 1 }, () => Array.from({ length: n2 + 1 }, () => 0))

    for (let i = n1 - 1; i >= 0; i--) {
        for (let j = n2 - 1; j >= 0; j--) {
            dp[i][j] = nums1[i] === nums2[j] ? dp[i + 1][j + 1] + 1 : 0
            res = Math.max(res, dp[i][j])
        }
    }
    return res
};