/**
 * @寻找重复数
 * 要求不改变数组，空间复杂度O(1)
 * 
 * 1. 排序后，找重复数 空间O(n)
 * 2. set，空间(n)
 * 3. 快慢指针(i->num[i]也是链表) 空间O(1)
 * 一个从起点出发，一个从相遇点出发，每次都走一步，它们相遇的位置就是环的入口- 重复数字
 */

var findDuplicate = function (nums) {
    let slow = 0, fast = 0;

    slow = nums[slow];
    fast = nums[nums[fast]];

    while (slow != fast) {
        slow = nums[slow];
        fast = nums[nums[fast]];
    }
    
    slow = 0;
    while (slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    return slow;
};


