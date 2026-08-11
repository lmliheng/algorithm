/**
 * @最大数
 * 179
 * 
 * 
 */

let nums = [3, 301, 3473273278328, 5, 9]


/**
 * @有问题的解法
 * nums =[111311,1113]
 */
function largestNumber (nums) {

    let numsObj = nums.map((item) => {
        while (item >= 10) {
            item = item / 10
        }
        return item
    }).map((item, index) => {
        return {
            num: item,
            index: index
        }
    })

    numsObj.sort((a, b) => b.num - a.num)

    console.log(nums, numsObj)

    let res = ''
    for (let i = 0; i < numsObj.length; i++) {
        res += (nums[numsObj[i].index]).toString()
    }
    return res
};