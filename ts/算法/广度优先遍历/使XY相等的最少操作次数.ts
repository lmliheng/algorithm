

/**
 * @使XY相等的最少操作次数
 * 
 * 数x和y，在一次操作中你可以执行以下四种操作之一：如果x是11的倍数，将x除以11；如果x是5的倍数，将
 * x除以5；将x减1；将x加1。求使得xy相等的最少操作次数
 */

function xy(x: number, y: number) {
    let step = 0
    let queue = [x]
    let visit = new Set([x])
    while (queue.length) {
        let len = queue.length
        for (let i = 0; i < len; i++) {
            let x_ = queue.shift()!
            if (x_ == y) { return step }
            if (x_ % 11 == 0) {
                let x__ = x_ / 11
                if (!visit.has(x__)) {
                    visit.add(x__)
                    queue.push(x__)
                }
            }
            if (x_ % 5 == 0) {
                let x__ = x_ / 5
                if (!visit.has(x__)) {
                    visit.add(x__)
                    queue.push(x__)
                }
            }
            if (!visit.has(x_ + 1)) {
                visit.add(x_ + 1)
                queue.push(x_ + 1)
            }
            if (!visit.has(x_ - 1)) {
                visit.add(x_ - 1)
                queue.push(x_ - 1)
            }
        }
        step++
    }
    return step
}

// console.log(xy(26, 1)) 3