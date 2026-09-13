/**
 * @23. 合并 K 个升序链表
 */

import { ListNode } from "../JS/DataStructure/ListNode.js";

var mergeKLists = function (lists: ListNode<number>[]) {
    let n = lists.length
    // let arr = new Array(n).fill(() => [])//fill([]) 防止使用同一地址
    let arr: number[][] = Array.from({ length: n }, () => [])
    // console.log(arr)
    for (let i = 0; i < n; i++) {
        let p = lists[i]
        while (p) {
            arr[i].push(p.val)
            p = p.next!
        }
    }
    console.log(arr)
    let arr1 = [...arr.flat(2).sort((a, b) => a - b)]
    console.log(arr1)

    let newHead = new ListNode(0)
    let p1 = newHead
    for (let i = 0; i < arr1.length; i++) {
        p1.next = new ListNode(arr1[i])
        p1 = p1.next
    }
    return newHead.next
};