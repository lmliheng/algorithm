/**
 * @1437. 是否所有 1 都至少相隔 k 个元素
 */

function kLengthApart(nums: number[], k: number): boolean {
    let zero_num: number = 0
    let l: number | undefined
    let r: number | undefined
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

            if ((r - l - 1) < k) {
                return false
            }
        }
    }
    return true
}

// let a = kLengthApart([1,0,0,1,0,1],2)
console.log(kLengthApart([1,0,0,1,0,1], 2))

export {};
