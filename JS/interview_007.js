let S = 'qwe'

let res = []
const used = new Array(S.length).fill(false)
const backtrack = (path) => {
    if (S.length === path.length) {
        res.push(path.join(''))
        // visited.clear()
        return
    }

    for (let i = 0; i < S.length; i++) {
        if (used[i]) continue
        used[i] = true
        path.push(S[i])
        backtrack(path)
        path.pop()
        used[i] = false
    }
}
backtrack([])

console.log(res)