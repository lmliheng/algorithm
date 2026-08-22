/**
 * 
 * @K个一组翻转链表
 * 
 * 
 */

/**
 * @原地操作
 * 还没写
 */



/***
 * @数组法
 */
var reverseKGroup = function (head, k) {
    let arr = []
    let p = head
    while (p) {
        arr.push(p.val)
        p = p.next
    }

    let n = arr.length
    let res = []
    for (let i = k - 1; i < n; i += k) {
        res.push(...arr.slice(i + 1 - k, i + 1).reverse())
    }
    res.push(...arr.slice(res.length))

    // create ListNode
    let newHead = new ListNode(0)
    let p1 = newHead
    for (let i = 0; i < n; i++) {
        p1.next = new ListNode(res[i])
        p1 = p1.next
    }
    return newHead.next
};