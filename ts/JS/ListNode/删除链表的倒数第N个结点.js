/**
 * @删除链表的倒数第 N 个结点
 * 1. 原地操作,参考removeNthFromEnd1
 * 2. 用数组记录节点，处理数组后构建新链表
 */


/**
 * 
 * @链表原地操作
 * 删除节点可能在第一个节点，中间节点，末尾节点
 * 第一个节点的删除：head.next,用dummy节点可以免去第一个节点的情况，我没有使用
 * 中间节点：直接p.next=p.next.next
 * 末尾n==1：需要拿到倒数第二个节点,在代码里也就是p1，p1.next=null删去最后一个节点
 * 使用if (p1.next && p1.next.next) {p1 = p1.next}的写法，避免了当len=1的时候p1.next为空报错的情况
 * 
 */
function removeNthFromEnd1(head, n) {
    let len = 0
    let p = head
    // p1 是倒数第二个节点，图中5
    let p1 = head
    let p2 = head
    while (p) {
        if (p1.next && p1.next.next) {
            p1 = p1.next
        }
        len++
        p = p.next
    }
    
    if (n == len) {
        return head.next
    }
    if (n == 1) {
        p1.next = null
    } else {
        for (let i = 0; i < len - n - 1; i++) {
            p2 = p2.next
        }
        console.log(p2)
        p2.next = p2.next.next
    }
    return head
};


/**
 * 
 * @数组法
 *  使用数组存储节点信息，对要删除的节点的前后节点进行next关联
 *  整个算法效率低 空间占用高
 */
 function removeNthFromEnd(head, n) {
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
    return dummy.next

};


