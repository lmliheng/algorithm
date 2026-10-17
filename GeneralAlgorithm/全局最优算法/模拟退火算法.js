/**
 * @模拟退火算法 simulated annealing
 * @概率性全局退火算法
 */
// function cost(x, y) {
//     return x * x + y * y;
// }

//-1
function cost(x,y) {
    return 0.1 * x * x + Math.sin(y);
}


// 随机扰动生成邻域解
function neighbor(x, y) {
    const step = 1;
    return {
        x: x + (Math.random() * 2 - 1) * step,
        y: y + (Math.random() * 2 - 1) * step
    };
}

function simulatedAnnealing() {
    let x = Math.random() * 10 - 5;
    let y = Math.random() * 10 - 5;
    let T = 100;
    const Tmin = 1e-3;
    // 最低温度
    const alpha = 0.95;
    // 降温系数

    let best = { x, y, cost: cost(x, y) };

    while (T > Tmin) {

        const next = neighbor(x, y);
        const curCost = cost(x, y);
        const nextCost = cost(next.x, next.y);

        const deltaE = nextCost - curCost;

        // 接受准则
        // 以一定概率接受，概率由metropoils准则决定
        if (deltaE < 0 || Math.random() < Math.exp(-deltaE / T)) {
            x = next.x;
            y = next.y;
        }

        if (cost(x, y) < best.cost) {
            best = { x, y, cost: cost(x, y) };
        }

        // 降温
        T *= alpha;
    }

    return best;
}

console.log(simulatedAnnealing());
