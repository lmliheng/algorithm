/**
 * @83. 删除排序链表中的重复元素
 */

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function deleteDuplicates(head: ListNode | null): ListNode | null {
    let l1: ListNode | null = head
    while (l1 && l1.next) {
        if (l1.val == (l1.next ? l1.next.val : 0)) {
            l1.next = l1.next.next ? l1.next.next : null
        } else {
            l1 = l1.next // l1为null的时候 空指针异常
        }
    }
    return head
}

let l1: ListNode = new ListNode(1, new ListNode(1, new ListNode(2)))
let l2: ListNode = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(3))))
const res: ListNode | null = deleteDuplicates(l2)
console.log(res)

export {};
