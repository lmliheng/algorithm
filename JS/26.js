"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function removeDuplicates(nums) {
    const map = new Map();
    nums.forEach((item, index) => {
        if (!map.has(item)) {
            map.set(item, index);
        }
    });
    nums = [...map.keys()];
    console.log(nums);
    return map.size;
    // [0,1,2,3,4]
}
console.log(removeDuplicates([0, 0, 1, 1, 1, 2]));
// console.log(removeDuplicates([1,1,2]))
// [0,1,2,3,4]
// 2
// [1,2]
