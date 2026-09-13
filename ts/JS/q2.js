/**
 * @param {number[]} nums
 * @return {number}
 */
var compareBitonicSums = function (nums) {
    let arr = []
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] > nums[i + 1]) {
             
            arr.push(nums.slice(0, i + 1))
            arr.push(nums.slice(i))
            break
        } 
    }
    console.log(arr)

    let sum1 = 0
    if (arr[0]) {
        sum1 = arr[0].reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    } else {
        return 1
    }

    let sum2 = 0
    if (arr[1]) {
        sum2 = arr[1].reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    } else {
        return 0
    }


    if (sum1 === sum2) {
        return -1
    } else if (sum1 > sum2) {
        return 0
    } else {
        return 1
    }

};

// console.log(compareBitonicSums([1,3,2,1]))
// console.log(compareBitonicSums([1,2,3,4,5]))
console.log(compareBitonicSums([1,2,4,3]))

