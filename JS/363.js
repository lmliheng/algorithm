let landStartTime = [2, 8]
let landDuration = [4, 1]
let waterStartTime = [6,7]
let waterDuration = [3,3]

let landStartTimeCopy = [...landStartTime]
let waterStartTimeCopy = [...waterStartTime]
// 从陆地
let landCompleteTime = Math.min(...landStartTime.map((item, index) => {
    return item + landDuration[index]
}))
for (let i = 0; i < waterStartTimeCopy.length; i++) {
    if (waterStartTimeCopy[i] < landCompleteTime) {
        waterStartTimeCopy[i] = landCompleteTime
    }
}

console.log("landCompleteTime:", landCompleteTime)
console.log(waterStartTimeCopy)


// 从水上
let waterCompleteTime = Math.min(...waterStartTime.map((item, index) => {
    return item + waterDuration[index]
}))

console.log("waterCompleteTime:", waterCompleteTime)
for (let i = 0; i < landStartTimeCopy.length; i++) {
    if (landStartTimeCopy[i] < waterCompleteTime) {
        landStartTimeCopy[i] = waterCompleteTime
    }
}

console.log(landStartTimeCopy)

let res1 = Math.min(...waterStartTimeCopy.map((item, index) => item + waterDuration[index]))
let res2 = Math.min(...landStartTimeCopy.map((item, index) => item + landDuration[index]))
console.log("res1:", res1)
console.log("res2:", res2)