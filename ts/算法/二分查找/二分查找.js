
/**
 * 
 * @找确切值
 * 找到返回其索引，找不到返回-1
 * 和数组的indexOf有类似功能
 */
export function BinarySearch(nums, target) {
    let l = 0
    let r = nums.length
    // 或者r=nums.length-1,while条件取(l<=r)
    while (l < r) {
        let mid = Math.floor((l + r) / 2)
        if (nums[mid] === target) {
            return mid
        } else if (nums[mid] < target) {
            l = mid + 1
        } else {
            r = mid - 1
        }
    }
    return -1
}

/**
 * @有序数组中找第一个大于等于target的下标
 * 如果返回值等于nums.length，说明不存在这个值
 */
export function BinarySearch_1(nums, target) {
    let l = 0
    let r = nums.length
    return lowerBound((mid) => nums[mid] >= target, l, r)
}


/**
 * @有序数组中找最后一个小于等于target的下标
 * 如果返回值等于0，说明不存在这个值
 */
export function BinarySearch_2(nums, target) {
    let l = 0
    let r = nums.length
    return upperBound((mid) => nums[mid] <= target, l, r)
}


/**
 * 
 * @二分查找求下界（最小满足条件的值）的模板函数
 * right不是最后一个节点索引，是
 */
export function lowerBound(check, left, right) {
    while (left < right) {
        let mid = Math.floor((left + right) / 2)
        if (check(mid)) {
            right = mid
        } else {
            left = mid + 1
        }
    }
    return left
}

/**
 * 
 * @二分查找求上界（最小满足条件的值）的模板函数
 */
export function upperBound(check, left, right) {
    while (left < right) {
        let mid = Math.floor((right - left + 1) / 2) + left // 向上取整
        if (check(mid)) {
            left = mid
        } else {
            right = mid - 1
        }
    }
    return left
}


if (process.argv[2] == '--test') {

    let num1 = [18, 21, 23, 26, 30]
    let target1 = 26
    let num2 = [18, 21, 23, 26, 26, 26, 30]
    let target2 = 26
    let nums3 = [18, 21, 23, 26, 26, 26, 30]
    let target3 = 24
    let nums4 = [18, 21, 23, 26, 26, 26, 30]
    let target4 = 27
    let nums5 = [18, 21, 23, 26, 26, 26, 30]
    let target5 = 31
    let nums6 = [18, 21, 23, 26, 26, 26, 30]
    let target6 = 17
    let test = [[num1, target1], [num2, target2], [nums3, target3], [nums4, target4], [nums5, target5], [nums6, target6]]
    let res=[]
    for (let i = 0; i < test.length; i++) {
        // console.log(BinarySearch_1(test[i][0], test[i][1]))
        // console.log(BinarySearch(test[i][0], test[i][1]))
        res.push(BinarySearch_2(test[i][0], test[i][1]))   
    }
    console.log(res)


}