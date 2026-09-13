let nums = [0, 1, 0, 1, 0, 1, 99]

let set = new Set()
let visitSet = new Set()
for (let i = 0; i < nums.length; i++) {
    if (!set.has(nums[i])) {
        set.add(nums[i])

    } else {
        visitSet.add(nums[i])

    }
}
console.log([...set].filter(item=>!visitSet.has(item))[0])
