/**
 * @117. 填充每个节点的下一个右侧节点指针 II
 */

class _Node {
    val: number;
    left: _Node | null;
    right: _Node | null;
    next: _Node | null;
    constructor(val?: number, left?: _Node | null, right?: _Node | null, next?: _Node | null) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
        this.next = next === undefined ? null : next;
    }
}

let root: _Node = new _Node(1, new _Node(2, new _Node(4), new _Node(5)), new _Node(3, null, new _Node(7)))

const bfs = (root: _Node | null): void => {
    if (!root) { return }
    let quene: _Node[] = [root]
    while (quene.length > 0) {
        // 队列中存储节点
        console.log("队列信息：", quene.map(n => n.val))

        for (let i = quene.length - 1; i >= 0; i--) {
            let node: _Node = quene.shift()!
            if (i !== 0) {
                node.next = quene[0]
            } else {
                node.next = null
            }

            if (node.left) { quene.push(node.left) }
            if (node.right) { quene.push(node.right) }
        }
    }
}
bfs(root)
console.log(root)

export {};
