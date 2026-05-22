"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class _Node {
    constructor(val, next, random) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
        this.random = (random === undefined ? null : random);
    }
}
let head = new _Node(1, new _Node(2));
if (head === null) {
    console.log(head);
}
let map = new Map();
for (let cur = head; cur !== null; cur = cur.next) {
    map.set(cur, new _Node(cur.val));
}
for (let cur = head; cur !== null; cur = cur.next) {
    let copyNode = map.get(cur);
    copyNode.next = cur.next ? map.get(cur.next) : null;
    copyNode.random = cur.random ? map.get(cur.random) : null;
}
console.log(map.get(head)); // map中存储的是地址
