let cost = [1,2,3]
let res = 0
cost.sort((a, b) => a - b)

while (cost.length > 0) {
    if (cost.length <= 2) {
        res += cost[cost.length - 1]
        cost.pop()
    } else {
        res = res + cost[cost.length - 1] + cost[cost.length - 2]
        cost.splice(cost.length - 3)
    }
}


console.log(res)