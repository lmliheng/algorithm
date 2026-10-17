import { ListNode } from './ListNode.js'
import { hasCycle } from './环形链表.js'
/**
 * @环形链表的定义
 */

let head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))))

let p1 = head
let p2 = head
while (p2.next) {
    if (p1.next.next.next) {
        p1 = p1.next
    }
    p2 = p2.next
}
p2.next = p1


/**
 * 构成了环形链表，测试环形
 */
if(hasCycle(head)){
    console.log('是环形链表')
}
// let p = head
// let i = 0
// while (i < 30 && p) {
//     console.log(p.val)
//     p = p.next
//     i++
// }