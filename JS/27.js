"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function removeElement(nums, val) {
    // LeetCode 的“原地修改”规则，既创建了新数组，又用了额外空间，违反了「原地修改」的要求
    const map = new Set();
    nums.forEach((item, index) => {
        if (item == val) {
            map.add(index);
        }
    });
    // console.log([...map.values()])
    nums = [...nums.filter((index) => !map.has(index))];
    // console.log(nums)
    return nums.length;
}
;
console.log(removeElement([3, 2, 2, 3], 3));
