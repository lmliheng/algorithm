let s = "a#b%*"
let res = ''
for (let i = 0; i < s.length; i++) {
    if (96 < s[i].charCodeAt() && 123 > s[i].charCodeAt()) {
        res += s[i]
    } else if (s[i] === '*') {
        if (res.length >= 1) {
            res = res.slice(0, res.length - 1)

        }
    } else if (s[i] === '#') {
        res = res.repeat(2)
    } else if (s[i] === '%') {
        res = res.split('').reverse().join('')
    }

    console.log(res)
}

console.log(res)