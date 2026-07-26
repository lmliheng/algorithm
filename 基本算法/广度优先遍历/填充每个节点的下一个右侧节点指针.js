
/**
 * @填充每个节点的下一个右侧节点指针
 */
function _Node(val, left, right, next) {
    this.val = val === undefined ? null : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
    this.next = next === undefined ? null : next;
};

let root = new _Node(1, new _Node(2, new _Node(4), new _Node(5)), new _Node(3, new _Node(6), new _Node(7)))

let quene = [root]

while (quene.length > 0) {
    console.log(quene.map(item=>item.val))
    setNext(quene)
    let len = quene.length
    for (let i = 0; i < len; i++) {
        let node = quene.shift()
        if (node.left) {
            quene.push(node.left)
        }
        if (node.right) {
            quene.push(node.right)
        }
    }
}

function setNext(array) {

    
    let n = array.length
    for (let i = 0; i < n; i++) {
        if (i === n - 1) {
            array[i].next = null
        } else {
            array[i].next = array[i + 1]
        }
    }
}


console.log(JSON.stringify(root))