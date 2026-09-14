/**
 * @82. 删除排序链表中的重复元素 II（解法二）
 */

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

let head: ListNode = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5, null)))))
let right: number = 4
let left: number = 2

let goal: ListNode = JSON.parse(JSON.stringify(head))

// 需要深拷贝链表 goal是新链表与head无关了
let r_pre: ListNode = goal // 在goal上
let r: ListNode = goal
// 获取left right，左右边半截链表
// 截取
while (r.val !== right) {
    // r的next是否为null
    if (r.next !== null) {
        r_pre = r
        r = r.next
        // console.log('r_pre：',r_pre)
        // console.log('r:',r)
    } else {
        break
    }
    if (goal.val !== left) {
        goal = goal.next!
        //    console.log('goal后移一位',goal)
    }
}
//截断
r_pre.next!.next = null
// console.log(goal)

const reverseNodeList = (head: ListNode | null): ListNode | null => {
    let pre: ListNode | null = null
    let p1: ListNode | null = head

    while (p1) {
        let temp: ListNode | null = p1.next
        p1.next = pre
        pre = p1
        p1 = temp
    }
    return pre
}

// console.log(reverseNodeList(head))
goal = reverseNodeList(goal)!

// 合并新链表
let point: ListNode = head
let point2: ListNode = head

while (point2.val !== right) {
    if (point2.next!.val == right) {
        break
    }
    point2 = point2.next!
}

while (point.val !== left) {
    if (point.next!.val == left) {
        point.next = goal
        break
    }
    point = point.next!
}

console.log(head)

export {};
