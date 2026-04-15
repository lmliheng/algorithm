/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    nums = nums.sort((a, b) => a - b);
    let res = [];
    console.log(nums.toString());

    if (nums.length == 3) {

        if (nums[0] + nums[1] + nums[2] == 0) {
            res.push([nums[0], nums[1], nums[2]]);
        }
        return res;

    }

    for (let i = 0; i < nums.length - 3; i++) {
        // 重复的i不执行

        // 排除无效循环
        if (nums[i] + nums[i + 1] + nums[i + 2] > 0 && nums[i] + nums[nums.length - 1] + nums[nums.length - 2] < 0 || nums[i] == nums[i + i]) {
            continue;
        }

        let head = i + 1;
        let foot = nums.length - 1;

        while (head < foot) {
            let sum = nums[i] + nums[head] + nums[foot];
            if (sum == 0) {
                res.push([nums[i], nums[head], nums[foot]]);
                head++;
                foot--;
            } else if (sum < 0) {
                head++;
            } else {
                foot--;
            }
        }

    }


    // 去重 
    res = res.filter((item, index, arr) => arr.findIndex(t => t[0] === item[0] && t[1] === item[1] && t[2] === item[2]) === index);
    return res;


};
console.log(threeSum([-1, 0, 1, 2, -1, -4]));
