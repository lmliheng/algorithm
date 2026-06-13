let words = ["abcd", "def", "xyz"]
let weights = [5, 3, 12, 14, 1, 2, 3, 2, 10, 6, 6, 9, 7, 8, 7, 10, 8, 9, 6, 9, 9, 8, 3, 7, 7, 2]
let wordArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let res = []
let map = new Map(wordArr.map((item, index) => [item, weights[index]]))
for (let i = 0; i < words.length; i++) {
    let sum = 0
    for (let j = 0; j < words[i].length; j++) {
        sum += map.get(words[i][j])
    }
    console.log(sum)
    res.push(wordArr[25-sum%26])
}

console.log(res)