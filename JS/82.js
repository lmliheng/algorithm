"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
class ListNode {
    constructor(val, next) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}
let head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(3, new ListNode(4, new ListNode(4, new ListNode(5)))))));
if (head === null) {
    console.log('链表为空');
}
let isDelete = false;
// 虚拟头节点
let Vhead = new ListNode(0, head);
let deleteNode = Vhead;
let n1 = Vhead.next;
let n2 = (_a = Vhead.next) === null || _a === void 0 ? void 0 : _a.next; //...
while (n2 === null || n2 === void 0 ? void 0 : n2.next) {
    if ((n1 === null || n1 === void 0 ? void 0 : n1.val) === n2.val) {
        n2 = n2.next;
        isDelete = true;
    }
    else {
        if (isDelete) {
            deleteNode.next = n2; // 截断
            isDelete = false;
        }
        else {
            // deleteNode= deleteNode.next
            // n1 = n1.next
            // n2 = n2.next
        }
    }
}
console.log(Vhead.next);
