/**
 * @difficulty medium
 * @tags 链表,数学,模拟
 * @time O(m+n)
 * @space O(1)
 * @note 哑结点加进位逐位相加，另一版转 BigInt 不推荐
 */

import { ListNode } from '../JS/DataStructure/ListNode.js'


function addTwoNumbers(l1: ListNode<number> | null, l2: ListNode<number> | null): ListNode<number> | null {
    let dummy = new ListNode<number>()
    let p1 = l1
    let p2 = l2
    let p=dummy
    let carry=0
    while (p1 || p2) {
        let v1=p1?p1.val:0
        let v2=p2?p2.val:0
        let sum=v1+v2+carry
        carry=Math.floor(sum/10)
        p.next=new ListNode<number>(sum%10)
        if(p1){p1=p1.next}
        if(p2){p2=p2.next}
        p=p.next
    }
    if(carry){
        p.next=new ListNode<number>(carry)
    }
    return dummy.next
};

/**
 * 
 * @转化成数组，再转化为number相加后，最后生成链表
 * 不推荐
 */
function addTwoNumbers1(l1: ListNode<number> | null, l2: ListNode<number> | null): ListNode<number> | null {
    let nums1=[]
    let nums2=[]
    let p1=l1
    let p2=l2
    while(p1){
        nums1.push(p1.val)
        p1=p1.next
    }
     while(p2){
        nums2.push(p2.val)
        p2=p2.next
    }
    // 出现大数相加的情况
    let nums=BigInt(nums1.reverse().join(''))+BigInt(nums2.reverse().join(''))
    let arr=nums.toString().split('').reverse().map((item)=>+item)
    let dummy=new ListNode<number>()
    let p=dummy
    for(let i=0;i<arr.length;i++){
        p.next=new ListNode<number>(arr[i])
        p=p.next
    }

    return dummy.next
};