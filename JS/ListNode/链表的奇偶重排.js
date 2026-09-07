
import { ListNode } from './ListNode.js'
/**
 * @链表的奇偶重排
 */


/***
 * @数组法:等通知写法
 */
function oddEvenList1(head) {
    let p = head
    let arr = []
    while (p) {
        arr.push(p.val)
        p = p.next
    }
    let a1 = []
    let a2 = []
    let n = arr.length
    for (let i = 0; i < n; i++) {
        if (i % 2) {
            a1.push(arr[i])
        } else {
            a2.push(arr[i])
        }
    }
    arr = [...a2, ...a1]
    let dummy = new ListNode()
    let p1 = dummy
    for (let i = 0; i < n; i++) {
        p1.next = new ListNode(arr[i])
        p1 = p1.next
    }
    return dummy.next

}


function oddEvenList(head) {

    if (head == null || head.next == null) return head;
    let evenHead = head.next
    
    let odd = head
    let even = head.next
    while (even != null && even.next != null) {
        odd.next = even.next;
        odd = odd.next;
        even.next = odd.next;
        even = even.next;
    }
    odd.next = evenHead;
    return head;
}