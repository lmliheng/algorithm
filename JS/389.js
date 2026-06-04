let s = "abcd"
let t = "abcde"
let res = 0
for (let ch of s) {
    res ^= ch.charCodeAt(0)  
}
for (let ch of t) {
    res ^= ch.charCodeAt(0)
}

 console.log(String.fromCharCode(res))