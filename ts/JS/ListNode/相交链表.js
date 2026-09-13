import { ListNode } from './ListNode.js'

/**
 * 
 * @相交链表
 * 
 * headA = [4,1,8,4,5],headB = [5,6,1,8,4,5]
 * 如果看是否有相交节点，那么
 * [4,1,8,4,5,5,6,1,8,4,5]和[5,6,1,8,4,5,4,1,8,4,5]
 * 同时遍历两个链表必定有相同节点
 * 
 */
export function getIntersectionNode(headA, headB) {
    if (!headA || !headB) {
        return null
    }
    let p1 = headA
    let p2 = headB
    while (p1 !== p2) {
        p1 = p1 ? p1.next : headB
        p2 = p2 ? p2.next : headA
    }
    return p1
};