/**
 * @电话号码的字母组合
 * 
 * 如果是'234'，
 * 回溯顺序是adg,adh,adi...
 * 这个顺序很好理解，也是这道题算法要实现的流程
 * 
 */

function letterCombinations(digits) {
    let res = []
    let phone = {
        '2': ['a', 'b', 'c'],
        '3': ['d', 'e', 'f'],
        '4': ['g', 'h', 'i'],
        '5': ['j', 'k', 'l'],
        '6': ['m', 'n', 'o'],
        '7': ['p', 'q', 'r', 's'],
        '8': ['t', 'u', 'v'],
        '9': ['w', 'x', 'y', 'z']
    }
    const BackTrack = (path, index) => {
        if (path.length == digits.length) {
            res.push([...path].join(''))
            return
        }
        for (let i = 0; i < phone[digits[index]].length; i++) {
            path.push(phone[digits[index]][i])
            BackTrack(path, index + 1)
            path.pop()
        }
    }
    BackTrack([], 0)
    return res
};