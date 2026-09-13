
let words = ["Hello", "Alaska", "Dad", "Peace"]
let set_1 = new Set(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'])
let set_2 = new Set(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'])
let set_3 = new Set(['z', 'x', 'c', 'v', 'b', 'n', 'm'])

let res = []
for (let i = 0; i < words.length; i++) {
    word = words[i].toLowerCase()
    let setIndex = 1
    if (set_1.has(word[0])) {
        setIndex = 1
    } else if (set_2.has(word[0])) {
        setIndex = 2
    } else if (set_3.has(word[0])) {
        setIndex = 3
    }

    let set = setIndex === 1 ? set_1 : setIndex === 2 ? set_2 : set_3
    let flag = true
    for (let j = 1; j < word.length; j++) {
        if (!set.has(word[j])) {
            flag = false
            break
        }
    }
    if (flag) {
        res.push(words[i])
    }
}

console.log(res)