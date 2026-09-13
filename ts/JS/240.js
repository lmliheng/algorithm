let matrix = [[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]]
let target = 5

let m = matrix.length
let n = matrix[0].length
for (let i = 0; i < m; i++) {

    console.log('i:', i)

    let l = 0
    let r = n - 1
    while (l <= r) {
        let mid = Math.floor(l + (r - l) / 2)
        if (matrix[i][mid] === target) {
            console.log('找到target', mid)
             break
        } else if (matrix[i][mid] < target) {
            l = mid + 1
        } else {
            r = mid - 1
        }
    }
    // 使用二分查找


}