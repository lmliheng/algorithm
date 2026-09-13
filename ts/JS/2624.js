/**
 * @param {number} rowsCount
 * @param {number} colsCount
 * @return {Array<Array<number>>}
 */
Array.prototype.snail = function (rowsCount, colsCount) {
    if (rowsCount * colsCount !== this.length) {
        return []
    }
    let res = []
    
    for (let i = 0; i < rowsCount; i++) {
        let flag = 1 // 奇数表示先下后上
        res.push([])
        let node = i
        for (let j = 0; j < colsCount; j++) { // 0 9 10 19
            res[res.length - 1].push(this[node])
            if (flag % 2) {
                node += ((rowsCount - i) * 2 - 1)
            } else {
                node += (i * 2 + 1)
            }
            flag++

        }
        console.log(res)
    }
    return res
}

/**
 * const arr = [1,2,3,4];
 * arr.snail(1,4); // [[1,2,3,4]]
 */