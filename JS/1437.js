/**
 * @是否所有1都至少相隔k个元素
 */
export function kLengthApart(nums, k) {
    let zero_num = 0
    let l
    let r
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 1) {
            if (l === undefined) {
                l = i
                continue
            } else if (r === undefined) {
                r = i
                if ((r - l) < k) {
                    return false
                }
                continue
            }

            l = r
            r = i

            if ((r - l-1) < k) {
                return false
            }

        }
    }
    return true
};

// let a = kLengthApart([1,0,0,1,0,1],2)