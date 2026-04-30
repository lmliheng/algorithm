  let matrix = [[2,1,3],[6,5,4],[7,8,9]]
  let m = matrix.length
    let n = matrix[0].length
    let dp = new Array(m).fill(0).map(() => new Array(n).fill(0))
    for (let i = 0; i < n; i++) {
        dp[0][i] = matrix[0][i]
    }
    for (let i = 1; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (j === 0) {
                dp[i][0] = Math.min(dp[i - 1][0], dp[i - 1][1]) + matrix[i][0]
                console.log("1:",dp[i][0])
            } else if (j === n - 1) {
                dp[i][n - 1] = Math.min(dp[i - 1][n - 1], dp[i - 1][n - 2]) + matrix[i][n - 1]
            } else {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i - 1][j + 1]) + matrix[i][j]
            }
        }
    }
    let lastRow = dp[m - 1]
    a=1