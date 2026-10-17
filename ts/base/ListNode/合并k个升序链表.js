/**
 * @合并k个升序链表
 */


/**
 * 
 * @数组法
 */
export function mergeKLists(lists) {
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
    arr = [...arr.flat(2).sort((a, b) => a - b)]
    console.log(arr)

    let newHead = new ListNode(0)
    let p1 = newHead
    for (let i = 0; i < arr.length; i++) {
        p1.next = new ListNode(arr[i])
        p1 = p1.next
    }
    return newHead.next
};