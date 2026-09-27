/**
 * @difficulty medium
 * @tags 链表,双指针
 * @time O(n)
 * @space O(1)
 * @note 双指针走到倒数第二，尾节点接头部
 * @61. 旋转链表
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

let head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5, null)))))

let clonehead = head
let p = head?.next as ListNode

while (head?.next?.next) {
    head = head.next
    p = p.next as ListNode
}
head.next = null
p.next = clonehead



let a = 1
