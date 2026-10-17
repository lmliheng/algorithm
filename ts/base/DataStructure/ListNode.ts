/**
 * @单向链表
 *
 * 
 * 不是NodeList,NodeList是DOM接口类型
 */
export class ListNode<T> {
    val: T
    next: ListNode<T> | null
    constructor(val?: T, next?: ListNode<T>) {
        // 不传参，默认是number型链表
        this.val = (val ?? 0) as T
        this.next = next === undefined ? null : next
    }
}

const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))))