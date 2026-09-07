/**
 * @环形链表
 * 
 */



/**
 * @使用集合
 */
export function detectCycle(head) {
    let set = new Set()
    let p = head
    while (p) {
        if (!set.has(p)) {
            set.add(p)
        } else {
            return p
        }
        p = p.next
    }
    return null
};