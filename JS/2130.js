/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number}
 */
var pairSum = function (head) {
    let node = head
    let arr = []
    while (node) {
        arr.push(node.val)
        node = node.next

    }
    let res = 0

    console.log(arr)
    for (let i = 0; i < Math.floor(arr.length / 2); i++) {

        res = Math.max(res, arr[i] + arr[arr.length - 1 - i])
    }
    console.log(res)
    return res
};