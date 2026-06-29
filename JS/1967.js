let patterns = ["a", "abc", "bc", "d"]
let word = "abc"
let res = 0
for (let i = 0; i < patterns.length; i++) {
    if (word.indexOf(patterns[i])!==-1) {
        res++
    }
}

console.log(res)