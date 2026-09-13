let s = "catsanddog"
let wordDict = ["cats", "dog", "sand", "and", "cat"]

let res = 0
const recursive = (str: string) => {
    if (str.length === 0) {
        res++
        return
    }
    for (let i = 0; i < wordDict.length; i++) {
        
        console.log('当i为',i,'当前str为',str)
        if (str.indexOf(wordDict[i]) === 0) {
            console.log(str.slice(wordDict[i].length))
            recursive(str.slice(wordDict[i].length))
        }
    }

}

recursive(s)
console.log(res)