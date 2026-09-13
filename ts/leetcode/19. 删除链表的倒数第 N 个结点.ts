
import { ListNode } from '../JS/DataStructure/ListNode.js'
/**
 * 
 * @19. 删除链表的倒数第 N 个结点
 */

function removeNthFromEnd(head: ListNode<number> | null, n: number): ListNode<number> | null {
    if (!head) {
        return null
    }
    // 获取链表长度
    let list_length: number = 0;
    let p1: ListNode<number> | null = head as ListNode<number>
    let p2: ListNode<number> | null = head as ListNode<number>
    while (p1) {
        p1 = p1.next ? p1.next : null;
        list_length++
    }
    if (list_length === n) {
        return head.next
    }

    for (let i = 0; i < list_length - n - 1; i++) {
        if (!p2) {
            break
        }
        p2 = p2.next ? p2.next : null
    }

    // console.log('p2', p2)
    if (p2 && p2.next) {
        // console.log('删除节点', p2.next)
        p2.next = p2.next.next ? p2.next.next : null
    } else {
        return head.next
    }
    return head
};