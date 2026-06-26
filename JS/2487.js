function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}
console.log(new ListNode() == null)

let head = new ListNode(5, new ListNode(2, new ListNode(13, new ListNode(3))))
let st = new Array();
for (; head != null; head = head.next) {
    st.push(head);
}
for (; st.length > 0; st.pop()) {
    if (head == null || st[st.length - 1].val >= head.val) {
        st[st.length - 1].next = head;
        head = st[st.length - 1];
    }
}
console.log(head)