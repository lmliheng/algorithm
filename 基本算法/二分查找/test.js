
let num=[18,21,23,26,30]
let target=26
let l = 0
let r = num.length - 1
while (l <= r) {
    let mid = Math.floor(l + (r - l) / 2)
    console.log(mid)
    if (num[mid] === target) {
        console.log('找到target',mid)
        break
    } else if (num[mid] < target) {
        l = mid + 1
    } else {
        r = mid- 1
    }
}