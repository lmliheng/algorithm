/**
 * @环形链表
 * 
 */



/**
 * 
 * @使用哈希表 
 */
export function detectCycle(head) {
    let visit = new Set()
    let p = head
    while (p) {
        if (!visit.has(p)) {
            visit.add(p)
        } else {
            return p
        }
        p = p.next
    }
    return null
};