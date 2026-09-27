/**
 * @difficulty easy
 * @tags 字符串
 * @time O(n)
 * @space O(n)
 * @note trim后按空格切分，取最后一段长度
 * @58. 最后一个单词的长度
 */

function lengthOfLastWord(s: string): number {
    let arr=s.trim().split(' ')
    return arr.pop()!.length
};