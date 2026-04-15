/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    map = {
        '2': ['a', 'b', 'c'],
        '3': ['d', 'e', 'f'],
        '4': ['g', 'h', 'i'],
        '5': ['j', 'k', 'l'],
        '6': ['m', 'n', 'o'],
        '7': ['p', 'q', 'r', 's'],
        '8': ['t', 'u', 'v'],
        '9': ['w', 'x', 'y', 'z'],
    }

    console.log(map['2'], typeof map['2'])

    let res = []

    for (let i = 0; i < digits.length; i++) {
        // 处理
    }

    return res

};
console.log(letterCombinations("23"))
