/**
 * @K个一组翻转链表
 */

function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

let head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))))
let k = 2


let arr = []
let p = head
while (p) {
    arr.push(p.val)
    p = p.next
}
console.log(arr)
let n = arr.length
let res = []
for (let i = k - 1; i < n; i += k) {
    res.push(...arr.slice(i + 1 - k, i + 1).reverse())
}
res.push(...arr.slice(res.length))
console.log(res)
// create ListNode
let newHead = new ListNode(0)
let p1 = newHead
for (let i = 0; i < n; i++) {
    p1.next = new ListNode(res[i])
    p1 = p1.next
}

console.log(JSON.stringify(newHead.next))