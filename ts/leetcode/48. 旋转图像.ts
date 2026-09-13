/**
 * @48. 旋转图像
 */

/**
 * 
 * @原地
 * 利用ij关系先转置再对每行反转
 */
function rotate(matrix: number[][]): void {
    const n = matrix.length;

    // 转置
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }

    // 每行反转（水平翻转）
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
}

/**
 * 
 * @利用外置map记录关系
 * 多了O(m*n)空间复杂度
 */
function rotate1(matrix: number[][]): void {
    let map = new Map()
    let n = matrix.length
    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            map.set(`${row},${col}`, matrix[n - col - 1][row])
        }
    }

    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            matrix[row][col] = map.get(`${row},${col}`)
        }
    }

};