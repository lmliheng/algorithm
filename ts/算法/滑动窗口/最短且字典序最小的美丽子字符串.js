/**
 * @最短且字典序最小的美丽子字符串
 */

function shortestBeautifulSubstring(s, k) {
    let one_count = 0
    let left = 0
    let minLen = s.length
    let res = []
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '1') {
            one_count++
        }
        while (one_count > k) {
            if (s[left] === '1') {
                one_count--
            }
            left++
        }

        while (one_count === k && s[left] === '0') {
            left++;
        }

        if (one_count == k && minLen >= i - left + 1) {

            if (minLen > i - left + 1) {
                minLen = i - left + 1
                res = [s.substring(left, left + minLen)]
            } else {
                res.push(s.substring(left, left + minLen))
            }

        }
    }
    if (res.length == 0) {
        return ''
    }
    res.sort((a, b) => a - b)
    console.log(res)
    return res[0]

};