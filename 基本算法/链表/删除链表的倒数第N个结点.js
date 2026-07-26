/**
 * @删除链表的倒数第 N 个结点
 * 我这里是一个新方法： 使用数组存储节点信息，对要删除的节点的前后节点进行next关联
 * 整个算法效率低 空间占用高
 */

function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

var removeNthFromEnd = function (head, n) {
    let dummy = new ListNode(0)
    dummy.next = head
    let p = dummy
    let arr = []

    while (p) {
        arr.push(p)
        p = p.next
    }
    console.log(arr)
    let len = arr.length
    if (n === 1) {
        arr[len - 2].next = null
    } else {
        arr[len - n - 1].next = arr[len - n + 1] || null
    }

    console.log(dummy)
    // for(let )
    return dummy.next

};