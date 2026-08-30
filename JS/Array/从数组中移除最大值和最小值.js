/**
 * @从数组中移除最大值和最小值
 * 
 */
/**
 * @比第二个解法快太多
 * 取三数最小值就可 没有必要走if
 */
function minimumDeletions(nums) {
    let maxIndex = nums.indexOf(Math.min(...nums))
    let minIndex = nums.indexOf(Math.max(...nums))
    let l = nums.length
    let i, j, k
    if (maxIndex > minIndex) {
        let temp = maxIndex
        maxIndex = minIndex
        minIndex = temp
    }
    i = minIndex + 1
    j = l - maxIndex
    k = l - minIndex + maxIndex + 1
    return Math.min(i, j, k)
};



/**
 * 
 * @效率低
 */
function minimumDeletions1(nums) {
    let n = nums.length
    let nums_ = nums.map((item, index) => [item, index])
    nums_.sort((a, b) => a[0] - b[0])
    let minIndex = nums_[0][1]
    let maxIndex = nums_[n - 1][1]
    if (maxIndex > minIndex) {
        let temp = maxIndex
        maxIndex = minIndex
        minIndex = temp
    }
    console.log(maxIndex, minIndex)
    let leftAll = minIndex + 1
    let rightAll = n - maxIndex
    let both = maxIndex + 1 + (n - minIndex)
    return Math.min(leftAll, rightAll, both)

};
