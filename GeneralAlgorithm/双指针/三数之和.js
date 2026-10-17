/**
 * @三数之和
 * 
 * len小于3返回[]
 * 对nums排序，nums[0] + nums[1] + nums[2] > 0 || nums[len - 3] + nums[len - 2] + nums[len - 1] < 0 直接返回[]
 * 
 * 遍历[0,len-3],
 * 对后一次再次出现的相同元素 直接continue
 * nums[i] + nums[i + 1] + nums[i + 2] > 0 && nums[i] + nums[len - 2] + nums[len - 1] < 0走break
 * 在i，l=i+1,r=len-1进行双指针遍历
 * 
 */

export function threeSum(nums) {
    let res = []
    let len = nums.length

    // nums 长度小于三
    if (len < 3) {
        return []
    }

    nums.sort((a,b)=>a-b)

    if (nums[0] + nums[1] + nums[2] > 0 || nums[len - 3] + nums[len - 2] + nums[len - 1] < 0) {
        return []
    }
    for (let i = 0; i < len - 2; i++) {
        // 后面再次出现上一次出现的数字，一定是重复的结果
        if (i > 0 && nums[i] == nums[i - 1]) {
            continue
        }
        if (nums[i] + nums[i + 1] + nums[i + 2] > 0 && nums[i] + nums[len - 2] + nums[len - 1] < 0) {
            break
        }
        let l = i + 1
        let r = len - 1
        while (l < r) {
            let sum = nums[i] + nums[l] + nums[r]
            if (sum == 0) {
                res.push([nums[i], nums[l], nums[r]])
                r--
                l++
            } else if (sum > 0) {
                r--
            } else {
                l++
            }
        }

    }
    let res_filter = []
    let set = new Set()
    for (let i = 0; i < res.length; i++) {
        if (!set.has(JSON.stringify(res[i]))) {
            res_filter.push(res[i])
            set.add(JSON.stringify(res[i]))
        }
    }
    return res_filter

};

// console.log(threeSum([-1, 0, 1, 2, -1, -4]))
// console.log(threeSum([0, 0, 0]))
// console.log(threeSum([1, 2, 0, 1, 0, 0, 0, 0]))
console.log(threeSum([2, -3, 0, -2, -5, -5, -4, 1, 2, -2, 2, 0, 2, -4, 5, 5, -10]))