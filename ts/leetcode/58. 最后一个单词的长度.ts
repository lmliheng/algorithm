/**
 * @58. 最后一个单词的长度
 */

function lengthOfLastWord(s: string): number {
    let arr=s.trim().split(' ')
    return arr.pop()!.length
};