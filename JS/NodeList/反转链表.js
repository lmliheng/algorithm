import { ListNode } from './ListNode.js'
/**
 * @反转链表
 * 
 */
export function reverseList(head) {
    let p1 = head
    let arrList = []
    while (p1) {
        arrList.push(p1.val)
        p1 = p1.next
    }
    arrList.reverse()
    let dummy = new ListNode()
    let p2 = dummy
    for (let i = 0; i < arrList.length; i++) {
        p2.next = new ListNode(arrList[i])
        p2 = p2.next
    }
    return dummy.next
};