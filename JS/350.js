
let nums1 = [1, 2, 2, 1]
let nums2 = [2, 2]
let map1 = new Map()
let map2 = new Map()
for (let i = 0; i < nums1.length; i++) {
    if (map1.has(nums1[i])) {
        map1.set(nums1[i], map1.get(nums1[i]) + 1)
    } else {
        map1.set(nums1[i], 1)
    }
}

for (let i = 0; i < nums2.length; i++) {
    if (map2.has(nums2[i])) {
        map2.set(nums2[i], map2.get(nums2[i]) + 1)
    } else {
        map2.set(nums2[i], 1)
    }
}

let result = []
for (let [key, value] of map1) {
    if (map2.has(key)) {
        result.push([key, Math.min(value, map2.get(key))])
    }
}

let finalResult = []
for (let i = 0; i < result.length; i++) {
    finalResult.push(...new Array(result[i][1]).fill(result[i][0]))
}
console.log(finalResult)