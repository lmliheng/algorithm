class _Node {
    val: number
    next: _Node | null
    random: _Node | null

    constructor(val?: number, next?: _Node, random?: _Node) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
        this.random = (random === undefined ? null : random)
    }

}

let head=new _Node(1,new _Node(2))

if(head === null) {
    console.log(head)
}
let map = new Map()
for (let cur: _Node | null = head; cur !== null; cur = cur.next) {
    map.set(cur, new _Node(cur.val))
}

for (let cur: _Node | null = head; cur !== null; cur = cur.next) {
    let copyNode = map.get(cur)
    copyNode.next = cur.next ? map.get(cur.next) : null
    copyNode.random = cur.random ? map.get(cur.random) : null

}
console.log(map.get(head)) // map中存储的是地址
