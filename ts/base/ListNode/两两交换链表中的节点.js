import { ListNode } from './ListNode.js'

/**
 * @两两交换链表中的节点
 * 
 */


/**
 * 
 * @递归
 * 保证head有两个节点，head.next.next必定存在null or ListNode
 * 
 * one->two,two->three,two->one,one->swapPairs(three)
 * 做到了二指向一，一指向之后的递归结果
 * 
 */
function swapPairs(head) {
    if (!head || !head.next) {
        return head
    }
    let one = head
    let two = one.next
    let three = two.next
    two.next = one
    one.next = swapPairs(three)
    return two
};


// console.log(swapPairs(new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))))))

