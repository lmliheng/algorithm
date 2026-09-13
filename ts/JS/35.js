/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    if (nums[0] >= target) {
        return 0

    }
    if (nums[nums.length - 1] < target) {
        return nums.length
    }

    if (nums[nums.length - 1] == target) {
        return nums.length - 1
    }

    // 若target在数组中有
    if (nums.indexOf(target) != -1) {
        return nums.indexOf(target)
    } else {

        let l = 0
        let r = nums.length - 1
        while (l <= r) {

            if (nums[l] < target) {
                console.log('nums[l]<tatget的l是', l)
                if (nums[l + 1] > target) { return l + 1 }
                l++
            }
            if (nums[r] > target) {
                console.log('nums[r]>tatget的r是', r)
                if (nums[r - 1] < target) { return r }
                r--
            }
        }

    }



};

console.log(searchInsert([1, 3, 5], 4))
