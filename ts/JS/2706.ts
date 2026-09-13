let prices = [1,2,2]
let money = 3
let Min1=Math.min(...prices)
prices.splice(prices.indexOf(Min1),1)
let Min2=Math.min(...prices)

console.log(Min2)