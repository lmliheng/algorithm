let matrix =[["1","1"],["1","1"]]
 console.log(matrix)
 let m = matrix.length
    let n = matrix[0].length
    let max = matrix[0][0] === '0' ? 0 : 1
    //dp[i][j]是以ij元素作为右下角元素的最大正方形边长
    let dp = new Array(m).fill(0).map(() => new Array(n).fill(0))

    dp[0][0] = +matrix[0][0]
    for (let i = 1; i < m; i++) {

        dp[i][0] = +matrix[i][0]
        max = Math.max(max, dp[i][0])
    }
    for (let i = 1; i < n; i++) {
        dp[0][i] = +matrix[0][i]
        max = Math.max(max, dp[0][i])
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === "0") {
                continue
            }
            dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
            max = Math.max(max, dp[i][j])
        }
    }

    console.log(dp)
