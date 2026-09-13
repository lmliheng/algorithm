/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    new_strs = strs.sort()
    let same_str = ""
    for (let i = 0; i < new_strs[0].length; i++) {
        if (new_strs[0][i] == new_strs[new_strs.length - 1][i]) {
            same_str += new_strs[0][i]
        } else {
            break
        }
    }
    return same_str
}



strs = ["flower", "flow", "flight"]
console.log(longestCommonPrefix(strs));