/**
 * @合并k个升序链表
 */
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}
let lists = [new ListNode(1, new ListNode(4, new ListNode(5))), new ListNode(1, new ListNode(3, new ListNode(4))), new ListNode(2, new ListNode(6))]
let n = lists.length
// let arr = new Array(n).fill(() => [])//fill([]) 防止使用同一地址
let arr = Array.from({ length: n }, () => [])
console.log(arr)
for (let i = 0; i < n; i++) {
    let p = lists[i]
    while (p) {
        arr[i].push(p.val)
        p = p.next
    }
}
console.log(arr)
arr=[...arr.flat(2).sort((a,b)=>a-b)]
console.log(arr)

let newHead = new ListNode(0)
let p1 = newHead
for (let i = 0; i < arr.length; i++) {
    p1.next = new ListNode(arr[i])
    p1 = p1.next
}

console.log(JSON.stringify(newHead.next))