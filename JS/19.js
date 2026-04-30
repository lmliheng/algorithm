/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */

 function ListNode(val, next) {
      this.val = (val===undefined ? 0 : val)
      this.next = (next===undefined ? null : next)
  }

var removeNthFromEnd = function(head, n) {
if(head===null){
    return 0
}
    let p1 = head //ListNode 
    let p2 = head
    let p3 = head
    let l = 1
    while (p1 && p1.next) {
        console.log("p1:",p1)
        p1 = p1.next
        l++
    }
    // n=2 ,l=5。0,1,2,
    for (let i = 0; i < l - n-1; i++) {
        p2=p2.next // 4,5
        p3=p3.next
    }
    p3=p3.next
    p2.next=p3.next

    return head
};

  let head=new ListNode(1,new ListNode(2,new ListNode(3,new ListNode(4,new ListNode(5,null)))))
console.log(removeNthFromEnd(head,2))
    // if(p3.next){
    //     p2.next=p3.next
    // }else{
    //     p2.next=null
    // }

   