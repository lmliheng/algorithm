/**
 * @复原IP地址
 * 回溯+剪枝
 */

let s = "25525511135"
//输出：["255.255.11.135","255.255.111.35"]

let n = s.length

if (n > 12 || n < 4) {
    return []
}


let stack = []
let path = ''
const backTrack = (path) => {
    if (path.length === n + 3) {

    }
}


