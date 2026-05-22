function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

let root=new TreeNode(3,new TreeNode(9,new TreeNode(1)),new TreeNode(20, new TreeNode(15), new TreeNode(7)))

let res=[]
const bfs = (root) => {
    let quene = [root]
    while (quene.length) {

        console.log(quene)

        let node = quene.shift()

        if (node.left) {
            quene.push(node.left)
        }
        if (node.right) {
            quene.push(node.right)
        }
    }

}

bfs(root)