import { ListNode } from './ListNode.js'
/**
 * @回文链表
 * 
 * 对于回文数的判断：
 * 可以使用从两边向内移动，
 * 也可以使用从中心扩散的方法，比如最长回文子串这个题目
 * 
 * 本解法里的l,r并不太好分析长度为奇数偶数的情况，使用for更清晰,参考1
 * 可以举例[1,2,3,4,5],[1,2,3,4]，奇数遍历[0,1]，偶数遍历[0,1]
 * 
 */
export function isPalindrome(head) {
    let arr = []
    let p1 = head
    while (p1) {
        arr.push(p1.val)
        p1 = p1.next
    }
    let n = arr.length
    let l = 0
    let r = n - 1
    while (l < r) {
        if (arr[l] === arr[r]) {
            l++
            r--
        } else {
            return false
        }

    }
    return true
};


export function isPalindrome1(head) {
    let arr = []
    let p1 = head
    while (p1) {
        arr.push(p1.val)
        p1 = p1.next
    }
    let n = arr.length
    for (let i = 0; i < Math.floor(n / 2); i++) {
        if (arr[i] !== arr[n - i - 1]) {
            return false
        }
    }
    return true
};


