"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function removeElement(nums, val) {
    let r = 0;
    while (r < nums.length) {
        if (nums[r] === val) {
            nums.splice(r, 1);
            continue;
        }
        r++;
    }
    return nums.length;
}
;
console.log(removeElement([3, 2, 2, 3], 3));
