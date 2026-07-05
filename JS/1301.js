/**
 * @最大得分的路径数目
 * 返回一个列表，包含两个整数：第一个整数是 「得分」 的最大值，第二个整数是得到最大得分的方案数
 * 思路1：动态规划
 * 2：矩阵dfs
 */
let board1 = [
    "E23",
    "2X2",
    "12S"
]




let m = board1.length
let n = board1[0].length

let res = []
// visit是存在问题的 不应该设置在全局
let visit = new Array(m).fill(false).map(() => new Array(n).fill(false))

const dfs = (i, j, score, visit) => {

    if (i === 0 && j === 0) {
        console.log(score)
        return
    }

    if (i < 0 || i >= m || j < 0 || j >= n) {
        return
    }

    if (board1[i][j] === 'X') {
        return
    }

    if (visit[i][j]) { return }
    visit[i][j] = true

    console.log('当前点：', i, j)
    let s = board1[i][j] === 'S' ? 0 : (+board1[i][j])
    dfs(i - 1, j, score + s)
    dfs(i, j - 1, score + s)
    dfs(i - 1, j - 1, score + s)

}

dfs(m - 1, n - 1, 0, visit)