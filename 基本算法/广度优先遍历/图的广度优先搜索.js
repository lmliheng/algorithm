/**
 * @图的广度优先搜索
 * 
 */


/**
 * @无权图的最小路径
 * 属于迪杰斯特拉的特殊情况-权重为01的情况，本代码把最小优先队列变成了普通队列使用
 * @题目是穿越网格图的安全路径
 * https://leetcode.cn/problems/find-a-safe-walk-through-a-grid1/description/
 */
let grid1 = [
    [0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0]]

let grid2 = [
    [0, 1, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [0, 0, 0, 1, 0]]

    
let health = 1
let m = grid2.length
let n = grid2[0].length

let dist = new Array(m).fill(Infinity).map(() => new Array(n).fill(Infinity))
console.log(dist)
let dirction = [[0, 1], [1, 0], [-1, 0], [0, -1]]
let quene = []//普通队列

dist[0][0] = grid2[0][0]
quene.push([0, 0])

while (quene.length) {
    let [x, y] = quene.shift()
    for (const [u, v] of dirction) {
        let nx = x + u
        let ny = y + v
        if (ny < 0 || nx < 0 || ny >= n || nx >= m) { continue }
        let weight = grid2[nx][ny]
        if (dist[x][y] + weight < dist[nx][ny]) {
            dist[nx][ny] = dist[x][y] + weight
            if (weight === 0) {
                quene.unshift([nx, ny])
            } else {
                quene.push([nx, ny])
            }
        }
    }
}

console.log(dist)

