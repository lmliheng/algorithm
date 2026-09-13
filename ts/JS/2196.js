function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

let descriptions = [[20, 15, 1], [20, 17, 0], [50, 20, 1], [50, 80, 0], [80, 19, 1]]
// 先找到根节点

let ParArr = descriptions.map(item => item[0])
let ChiArr = descriptions.map(item => item[1])
console.log(ParArr, ChiArr)
let root = ParArr.filter(item => !ChiArr.includes(item))[0]
console.log(root)
let tree = new TreeNode(root)
let map = new Map()
map.set(root, tree)
for (let i = 0; i < descriptions.length; i++) {
    let par = descriptions[i][0]
    let chi = descriptions[i][1]
    let isLeft = descriptions[i][2]
    if (!map.has(par)) {
        map.set(par, new TreeNode(par))
    }
    if (!map.has(chi)) {
        map.set(chi, new TreeNode(chi))
    }
    if (isLeft) {
        map.get(par).left = map.get(chi)
    } else {
        map.get(par).right = map.get(chi)
    }
}
console.log(tree)