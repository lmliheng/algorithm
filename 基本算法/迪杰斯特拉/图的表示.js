/**
 * 有向无环 带权图
 */
let edges = [[0, 1, 5], [1, 3, 10], [0, 2, 3], [2, 3, 4]]
//转gragh对象格式
let gragh1 = {}
for (const [k, v, weight] of edges) {
    if (!gragh1[k]) { gragh1[k] = {} }
    gragh1[k][v] = weight
}
console.log(gragh1) //{ '0': { '1': 5, '2': 3 }, '1': { '3': 10 }, '2': { '3': 4 } }


/**
 * 有环 带权图
 */
let graph = {
    A: { B: 1, C: 4 },
    B: { A: 1, C: 2, D: 5 },
    C: { A: 4, B: 2, D: 1 },
    D: { B: 5, C: 1 }
};





