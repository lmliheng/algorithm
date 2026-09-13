/**
 * @合并两个有序链表
 * 
 */

/**
 * 
 * 遍历p1,p2,哪个节点值小的进p.next
 * 谁先结束，另一个直接跟在p.next后面
 * 
 */
function mergeTwoLists(list1, list2) {
    let dummy = new ListNode()
    let p1 = list1
    let p2 = list2
    let p = dummy
    while (p1 && p2) {
        if (p1.val > p2.val) {
            p.next = p2
            p2 = p2.next
            p = p.next
        } else {
            p.next = p1
            p1 = p1.next
            p = p.next
        }
    }
    if (!p1) {
        p.next = p2
    }
    if (!p2) {
        p.next = p1
    }
    return dummy.next
};


/**
 * @递归写法
 * 
 */
function mergeTwoLists1(l1, l2) {
    if (l1 === null) {
        return l2
    } else if (l2 === null) {
        return l1
    } else if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2)
        return l1
    } else {
        l2.next = mergeTwoLists(l1, l2.next)
        return l2
    }


};