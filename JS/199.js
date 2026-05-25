function _Node(val, left, right, next) {
    this.val = val === undefined ? null : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
};

let root = new _Node(1, new _Node(2, new _Node(4), new _Node(5)), new _Node(3, null, new _Node(7)))

if (!root) { return null }
let res = []
const bfs = (root) => {
    if(!root) { return }
    let quene = [root]
    while (quene.length > 0) {
        console.log("队列信息：", quene)
        res.push(quene[quene.length - 1].val)
        let l = quene.length//可拷贝长度后遍历完统一删除 ，也可以动态处理长度，边删元素边使用遍历
        for (let i = 0; i < l; i++) {
            let node = quene.shift()
            if (node.left) { quene.push(node.left) }
            if (node.right) { quene.push(node.right) }
        }

    }
}
bfs(root)
console.log(res)