/**
 * @排序链表
 * 1. 可以使用链表化为数组后排序，再生成链表
 * 2. 使用分治和归并排序的思想直接在链表本身上进行排序，更加高效
 */

function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

var sortList = function (head) {
    if (!head || !head.next) { return head}

    // 链表分半 使用追赶法
    let slow = head
    let fast = head.next
    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
    }
    let mid = slow.next
    slow.next = null // head就是前面那段
    let left = sortList(head)
    let right = sortList(mid)

    return merge(left, right)
};

function merge(l1, l2) {
    let dummy = new ListNode(0)
    let cur = dummy
    while (l1 && l2) {
        if (l1.val <= l2.val) {
            cur.next = l1
            l1 = l1.next
        } else {
            cur.next = l2
            l2 = l2.next
        }
        cur = cur.next
    }
    cur.next = l1 || l2
    return dummy.next

}
let head = new ListNode(4, new ListNode(6, new ListNode(5, new ListNode(1))))
console.log(JSON.stringify(merge(new ListNode(4, new ListNode(6)), new ListNode(3, new ListNode(5)))))
console.log(JSON.stringify(sortList(head)))