/**
 * 
 * @环形链表
 * 
 * 快慢指针，如果fast到了末尾说明不可能是环形的，
 * 这里fast指针是跳两个节点，所以当fast&&fast.next有一个为null就到结尾了
 * 可以更快..多跳几个 跳3个快了7ms
 */

export function hasCycle(head) {
    let fast = head
    let slow = head

    while (fast && fast.next) {
        fast = fast.next.next
        slow = slow.next
        if (fast == slow) {
            return true
        }
    }
    return false

};