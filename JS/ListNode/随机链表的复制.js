
class _Node {
    val
    next
    random

    constructor(val, next, random) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
        this.random = (random === undefined ? null : random)
    }
}

/**
 * @随机链表的复制
 * 
 * 使用map存储节点，key存储原节点，value存储新建节点
 * 在从节点结合map取出新节点，再关联新节点的next和random
 */
function copyRandomList(head) {
    let p = head
    let map = new Map()
    while (p) {
        map.set(p, new _Node(p.val))
        p = p.next
    }
    let p1 = head
    while (p1) {
        let copyNode = map.get(p1)
        copyNode.next = p1.next ? map.get(p1.next) : null
        copyNode.random = p1.random ? map.get(p1.random) : null
        p1 = p1.next
    }
    return map.get(head)
};