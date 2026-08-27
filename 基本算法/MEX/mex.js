/**
 * @MEX
 * 数组中最小的未出现的非负整数
 * 
 * 1. 若一个非负整数序列的 mex 为 x(x!=0)，那么 [0,x−1] 中的所有整数必然在序列中出现过。
 * 2. 
 * 
 */


/**
 * @[0,i]子数组的MEX
 */
function mex(nums) {
    let n = nums.length
    let res = Array.from({ length: n }, () => 0)
    let set = new Set()
    for (let i = 0; i < n; i++) {
        set.add(nums[i])
        if(nums[i]<res[i-1]){
            res[i]=res[i-1]
            break
        }
        for (let j = 0; j <= i + 1; j++) {
            if (!set.has(j)) {
                res[i] = j
                break
            }
        }
    }
    return res
}

console.log(mex([0,1,2,4,3,7]))