let wordsContainer = ["abcdefgh","poiuygh","ghghgh"]
let wordsQuery = ["gh","acbfgh","acbfegh"]

let wordsContainerLength = wordsContainer.map(item => item.length)
let wordsContainerLengthMin=Math.min(...wordsContainerLength)
console.log(wordsContainerLength)

let res = []
for (let i = 0; i < wordsQuery.length; i++) {
    // 对每个query操作
    let l = wordsQuery[i].length
    let arr = []// 存储符合条件的container元素下标，用于后面遍历
    for (let j = 0; j < wordsContainer.length; j++) {
        if (wordsContainer[j].slice(-l) === wordsQuery[i]) {
            arr.push(j)
        }
    }
    console.log('当i=', i, 'arr=', arr)
    let min = 10000
    for (let m = 0; m < arr.length; m++) {
        min = Math.min(wordsContainer[arr[m]].length, min)
    }
    console.log('min:', min)
    if (min === 10000) {
        res.push(wordsContainerLength.indexOf(wordsContainerLengthMin))
    } else {
        res.push(wordsContainerLength.indexOf(min))
    }


}

console.log(res)