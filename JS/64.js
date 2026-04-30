    let grid=[[1,3,1],[1,5,1],[4,2,1]]
    // dp
    let m = grid.length
    let n = grid[0].length
    let dp = new Array(m).fill(0).map(() => new Array(n).fill(0))
    dp[0][0]=grid[0][0]
    for (let i = 1; i < m; i++) {
        dp[i][0] = grid[i][0]+dp[i-1][0]
    }
    for (let i = 1; i < n; i++) {
        dp[0][i] = grid[0][i]+dp[0][i-1]
    }
    for (let x = 1; x < m; x++) {
        for (let y = 1; y < n; y++) {
            dp[x][y]=Math.min(dp[x-1][y],dp[x][y-1])+grid[x][y]

        }
    }
    a=1
