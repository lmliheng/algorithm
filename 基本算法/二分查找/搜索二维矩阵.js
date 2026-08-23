/**
 * @搜索二维矩阵
 * 
 * 题目要求时间复杂度是log(mn)
 * 
 */

function searchMatrix(matrix, target) {

    let m = matrix.length
    let n = matrix[0].length
    if (matrix[0][0] > target || matrix[m - 1][n - 1] < target) {
        return false
    }
    let low = -1
    let high = m - 1;
    while (low < high) {
        const mid = Math.floor((high - low + 1) / 2) + low;
        if (matrix[mid][0] <= target) {
            low = mid;
        } else {
            high = mid - 1;
        }
    }
    let row = low
    if (row === -1) return false;
    console.log(row)

    let l = 0
    let r = n - 1
    while (l < r) {
        let mid = Math.floor((l + r) / 2)
        if (matrix[row][mid] === target) {
            return true
        }
        if (matrix[row][mid] > target) {
            r = mid - 1
        } else {
            l = mid + 1
        }
    }
    return matrix[row][l] === target
};