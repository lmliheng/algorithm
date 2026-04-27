/**
 * @param {number[]} nums
 * @return {number[][]}
 */

// 重复部分

var threeSum = function (nums) {

    // if (nums.length == 3 && nums.join('') == '000') {
    //     return [0, 0, 0]
    // }

    let res = []

    for (let i = 0; i < nums.length - 2; i++) {
        for (let j = i + 1; j < nums.length - 1; j++) {
            for (let k = j + 1; k < nums.length; k++) {
                if (nums[i] + nums[j] + nums[k] == 0) {
                    res.push([nums[i], nums[j], nums[k]])
                }
            }
        }
    }
    for (let i = 0; i < res.length; i++) {
        res[i] = res[i].sort((a, b) => a - b)


    }
    console.log(res)

    let no_repeat = () => {
        for (let i = 0; i < res.length; i++) {
            console.log('i', i)
            for (let j = i + 1; j < res.length; j++) {
                console.log('j', j)
                if (res[i].join('') === res[j].join('')) {
                    console.log('重复')
                    res.splice(j, 1)
                    console.log('res.length:', res.length)
                }
            }
        }
    }

    no_repeat()

    if (res.length >= 2) {
        no_repeat()
    }
    return res

};
// console.log(threeSum([-1, 0, 1, 2, -1, -4]));
console.log(threeSum([0, 0, 0, 0]));
