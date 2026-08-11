import { ListNode } from './ListNode.js'
/**
 * @回文链表
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
            break
        }

    }
    return true
};