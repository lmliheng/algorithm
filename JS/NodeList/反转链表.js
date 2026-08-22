import { ListNode } from './ListNode.js'
/**
 * @反转链表
 * 
 */


/**
 * 
 * @原地修改链表
 * [1,2,3,4]
 * pre=[1,null],cur=[2,3,4]
 * pre=[2,1,null],cur=[3,4]
 */
export function reverseList1(head) {
    let pre = null
    let cur = head
    while (cur) {
        let temp = cur.next
        cur.next = pre
        pre = cur
        cur = temp
    }
    return pre
}


/**
 * 
 * @使用数组完成
 */
export function reverseList2(head) {
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


