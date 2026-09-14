/**
 * @82. 删除排序链表中的重复元素 II（解法三）
 */

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

let head: ListNode = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(3, new ListNode(3, new ListNode(4, new ListNode(4, null)))))))

if (head === null) {
    console.log('链表为空')
}
let isDelete: boolean = false
// 虚拟头节点
let Vhead: ListNode = new ListNode(0, head)

let deleteNode: ListNode = Vhead
let n1: ListNode | null = Vhead.next
let n2: ListNode | null = Vhead.next?.next ?? null
while (n2) {
    if (n1?.val === n2.val) {
        n2 = n2.next
        isDelete = true
    } else {
        if (isDelete) {
            deleteNode.next = n2 // 截断
            n1 = n2
            n2 = n2.next
            isDelete = false
        } else {
            deleteNode = deleteNode.next!
            n1 = n1.next
            n2 = n2.next
        }
    }
}

if (isDelete) {
    deleteNode.next = null
}
console.log(Vhead.next)

export {};
