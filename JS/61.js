"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
class ListNode {
    constructor(val, next) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}
let head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5, null)))));
let clonehead = head;
let p = head === null || head === void 0 ? void 0 : head.next;
while ((_a = head === null || head === void 0 ? void 0 : head.next) === null || _a === void 0 ? void 0 : _a.next) {
    head = head.next;
    p = p.next;
}
head.next = null;
p.next = clonehead;
let a = 1;
