import { ListNode } from "../JS/DataStructure/ListNode.js"

/**
 * @difficulty medium
 * @tags 链表,递归
 * @time O(n)
 * @space O(n)
 * @note 递归两两交换，返回交换后的新头节点
 * @24. 两两交换链表中的节点
 */

function swapPairs(head: ListNode<number> | null): ListNode<number> | null {
   
    if (!head || !head.next) {
        return head
    }
    let one = head
    let two = one.next
    let three = (two!).next
    two!.next = one
    one.next = swapPairs(three)
    return two

};