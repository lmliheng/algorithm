import { BinaryTree } from '../../JS/Tree/BinayTree/BinaryTree.js';
/**
 * @二叉树的bfs
 * 队列
 */
let root = new BinaryTree(1, new BinaryTree(2, new BinaryTree(4), new BinaryTree(5)), new BinaryTree(3, new BinaryTree(6), new BinaryTree(7)));
let quene = [root];
while (quene.length > 0) {
    console.log(quene.map(item => item.val));
    let len = quene.length;
    for (let i = 0; i < len; i++) {
        let node = quene.shift();
        if (node.left) {
            quene.push(node.left);
        }
        if (node.right) {
            quene.push(node.right);
        }
    }
}
