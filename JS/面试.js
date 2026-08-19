
if (process.argv[2] === '1') {

    let w = 10
    let c = [5, 2, 6, 4, 3]

    let n = c.length
    let res = []

    if (c.indexOf(w) !== -1) {
        res[c.indexOf(w)] = 1
        // return res
    }
    let path = Array.from({ length: n }, () => 0)

    const backtrack = (path,visit) => {
        if (sumArray(path) == w && oneNum(res) < oneNum(path)) {
            res = [...path]
        }
        

    }
    backtrack(path)


    function sumArray(arr) {
        let sum = 0
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i]
        }
        return sum
    }

    function oneNum(arr) {
        let nums = 0
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == 1) { nums++ }
        }
        return nums
    }

}

if (process.argv[2] === '2') {

    let inPutStr = 'abbacca'

    let n = inPutStr.length
    let res = []
    let max_len = 0
    if (!n) {
        // return ''

    }
    for (let i = 0; i < n; i++) {
        expand(i, i)
        expand(i, i + 1)
    }
    function expand(left, right) {
        while (left >= 0 && right < n && inPutStr[left] == inPutStr[right]) {
            left--
            right++
        }
        if (right - left - 1 > max_len) {
            res = [inPutStr.slice(left + 1, right)]
            max_len = right - left - 1
        } else if (right - left - 1 == max_len) {
            res.push(inPutStr.slice(left + 1, right))
        }


    }
    console.log(res)

}

if (process.argv[2] === '3') {
    /**
 * 3
 */
    // let n = 4
    // let lens = [1, 1, 1, 1]

    let n = 5
    let lens = [9, 3, 5, 1, 16]
    let res = 0
    for (let i = 0; i < n - 2; i++) {
        for (let j = i + 1; j < n - 1; j++) {
            for (let k = j + 1; k < n; k++) {
                let l1 = lens[i]
                let l2 = lens[j]
                let l3 = lens[k]
                let compare = [l1, l2, l3]
                compare.sort((a, b) => a - b)
                if (compare[2] < compare[0] + compare[1]) {
                    res++
                }
            }
        }
    }
    console.log(res)
}
