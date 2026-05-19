let nums1 = [1, 2, 3]
let nums2 = [2, 4]

let set = new Set(nums1)
let res = []
for (let i of nums2) {
    if (set.has(i)) {
        res.push(i)
    }
}

console.log(res)
