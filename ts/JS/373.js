/**
 *  查找和最小的 K 对数字
 */
let nums1 = [1, 7, 11]
let nums2 = [2, 4, 6]
let k = 3
let n1 = nums1.length
let n2 = nums2.length
nums1.sort((a, b) => a - b)
nums2.sort((a, b) => a - b)
console.log(nums1, nums2)


// 流程：
// 1 2 push
// 1 4 和 2 7 。5<9 push 5
// 2 7 和 1 6 。7<9 push 7


let res = []
let p1 = 0
let p2 = 0
while (p1 !== n1 && p2 !== n2) {
    if (p1 === 0 && p2 === 0) {
        res.push([nums1[p1], nums2[p2]])
    }
    if (nums1[p1 + 1] + nums2[p2])

}