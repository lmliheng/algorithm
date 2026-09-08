/**
 * @使XY相等的最少操作次数
 */
function xy(x, y) {
    let step = 0;
    let queue = [x];
    let visit = new Set([x]);
    while (queue.length) {
        let len = queue.length;
        for (let i = 0; i < len; i++) {
            let x_ = queue.shift();
            if (x_ == y) {
                return step;
            }
            if (x_ % 11 == 0) {
                let x__ = x_ / 11;
                if (!visit.has(x__)) {
                    visit.add(x__);
                    queue.push(x__);
                }
            }
            if (x_ % 5 == 0) {
                let x__ = x_ / 5;
                if (!visit.has(x__)) {
                    visit.add(x__);
                    queue.push(x__);
                }
            }
            if (!visit.has(x_ + 1)) {
                visit.add(x_ + 1);
                queue.push(x_ + 1);
            }
            if (!visit.has(x_ - 1)) {
                visit.add(x_ - 1);
                queue.push(x_ - 1);
            }
        }
        step++;
    }
    return step;
}
export {};
// console.log(xy(26, 1)) 3
