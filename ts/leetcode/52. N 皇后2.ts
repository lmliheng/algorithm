/**
 * @52. N 皇后 II
 */


var totalNQueens = function (n: number) {
    let res = 0
    //let quene = new Array(n).fill(-1)
    let colUsed = new Array(n).fill(false)
    let diag1 = new Array(2 * n - 1).fill(false)
    let diag2 = new Array(2 * n - 1).fill(false)


    const dfs = (r: number) => {
        if (r > n - 1) {
            res++
            //  console.log([...quene])
            return
        }
        for (let col = 0; col < n; col++) {
            if ((!colUsed[col]) && (!diag1[r + col] && (!diag2[r - col + n - 1]))) {
                //quene[r] = col
                colUsed[col] = diag1[r + col] = diag2[r - col + n - 1] = true
                dfs(r + 1)
                // 回退

                colUsed[col] = diag1[r + col] = diag2[r - col + n - 1] = false

            }
        }
    }

    dfs(0)
    return res
};