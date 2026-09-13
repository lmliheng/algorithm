/**
 * @param {number[]} nums
 * @return {number}
 */
var minMirrorPairDistance = function (nums) {
    let minDis = 100000
    const reverse = (val) => {
        return +(val.toString().split("").reverse().join(""))
    }

    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            console.log(nums[i], reverse(nums[i]))
            if (nums[j] == reverse(nums[i])) {
                minDis = Math.min(minDis, Math.abs(j - i))

            }
        }
    }
    if (minDis == 100000) {
        return -1
    } else {
        return minDis
    }
};

console.log(minMirrorPairDistance([120, 21]))