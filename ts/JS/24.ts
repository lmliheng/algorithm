/**
 * Definition for singly-linked list.
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}


function swapPairs(head: ListNode | null): ListNode | null {
    if (!head || !head.next) {
        return head
    }
    console.log('head:', head)
    let p: ListNode | null = head.next
    head.next = swapPairs(p.next)
    p.next = head
    return p
};

const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))))
console.log(swapPairs(head))
