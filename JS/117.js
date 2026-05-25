
function _Node(val, left, right, next) {
    this.val = val === undefined ? null : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
    this.next = next === undefined ? null : next;
};

let root = new _Node(1, new _Node(2, new _Node(4), new _Node(5)), new _Node(3, null, new _Node(7)))

if (!root) {
    return null
}
const bfs = (root) => {
    if (!root) { return }
    let quene = [root]
    while (quene.length>0) {

        // 队列中存储节点
        console.log("队列信息：", quene)

        for (let i = quene.length - 1; i >= 0; i--) {
            let node = quene.shift()
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
