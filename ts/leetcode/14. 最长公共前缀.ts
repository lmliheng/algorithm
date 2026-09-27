/**
 * @difficulty easy
 * @tags 字符串,排序
 * @time O(n log n * m)
 * @space O(1)
 * @note 排序后只需比较首末两串的公共前缀
 * @14. 最长公共前缀
 */


/**
 * 
 * 对数组排序后，不用去对比前后每一个元素的某索引的元素相等，
 * 直接对比- 数组首末元素的该索引对应元素是否相等
 */
var longestCommonPrefix = function (strs: string[]) {
    strs.sort()
    let same_str = ""
    for (let i = 0; i < strs[0].length; i++) {
        if (strs[0][i] == strs[strs.length - 1][i]) {
            same_str += strs[0][i]
        } else {
            break
        }
    }
    return same_str
}
