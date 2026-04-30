/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

 function ListNode(val, next) {
      this.val = (val===undefined ? 0 : val)
      this.next = (next===undefined ? null : next)
  }

var deleteDuplicates = function (head) {
    if (head === null) {
        return head
    }
    let p1 = head
    let p2=  head

    // p1 = p1.next// 2追赶1
    while (p1.next) {

        if (p1.val === p1.next.val) {
            p1 = p1.next
            console.log("p1等之后：",p1)
            
        }else{
            p1 = p1.next
        }
       
       
    }
    return head

};


  let head=new ListNode(1,new ListNode(1,new ListNode(1,new ListNode(3,new ListNode(5,new ListNode(5,new ListNode(5,null)))))))
// console.log(deleteDuplicates(head))
  let p1 = head
  let flag= head.val===head.next.val?true:false
    // p1 = p1.next// 2追赶1
    while (p1.next?.next) {
        if (p1.next.val === p1.next.next.val) {
            let p2=p1.next
            while(p2.next && p2.val===p2.next.val){
                    p2=p2.next
            }
                p1.next =p2.next      
        }else{
            p1 = p1.next
        }
    
    }

    if(flag){
        head=head.next
    }

    a=1