/**
 * @436. 寻找右区间
 */
let intervals = [[1,1],[3,4]]
let res: number[] = []
for (let i = 0; i < intervals.length; i++) {
    let minIndex: number | undefined
    let r = intervals[i][1]
    // 本身也算
    if(intervals[i][0]===intervals[i][1]){
        res.push(i)
        continue
    }

    intervals.map((item, index) => {
        if (index !== i && item[0] >= r) {

            if (minIndex !== undefined) {
                if (item[0] - r < intervals[minIndex][0] - r) {
                    minIndex = index
                }
            } else {
                minIndex = index
            }

        }

    })
    if (minIndex !== undefined) {
        res.push(minIndex)
    } else {
        res.push(-1)
    }
}

console.log(res)
