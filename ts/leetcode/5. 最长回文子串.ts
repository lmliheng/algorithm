/**
 * @5. 最长回文子串
 */

/**
 * 
 * @中间扩展法
 * O(n^2)
 */
function longestPalindrome(s: string): string {
    let res = ''
    const expand = (l: number, r: number) => {
        while (l >= 0 && r < s.length && s[l] == s[r]) {
            l--
            r++
        }
        if (r - l - 1 > res.length) {
            res = s.slice(l + 1, r);
        }
    }
    for (let i = 0; i < s.length; i++) {
        expand(i, i)
        expand(i, i + 1)
    }
    return res

};

/**
 * @Manacher
 * （O(n)）
 */
