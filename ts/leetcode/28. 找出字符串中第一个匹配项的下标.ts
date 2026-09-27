/**
 * @difficulty easy
 * @tags 字符串
 * @note 直接调用 indexOf 返回下标，注释标 KMP 未实现
 * @28. 找出字符串中第一个匹配项的下标
 */

/**
 * 
 * @KMP
 */
function strStr1(haystack: string, needle: string): number {
    return haystack.indexOf(needle)
};