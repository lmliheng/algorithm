function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

let head = new ListNode(3, new ListNode(1, new ListNode(6)))

let arr = []
let node = head
while (node) {
    arr.push(node.val)
    node = node.next
}
arr.sort((a, b) => a - b)

// 新建节点
let root = new ListNode() // 虚拟头节点
let p = root // 指针
for (let i = 0; i < arr.length; i++) {
    let n = new ListNode(arr[i])
    p.next = n
    p = p.next
}

console.log(root.next)
