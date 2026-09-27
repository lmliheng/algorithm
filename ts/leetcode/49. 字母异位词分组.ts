

/**
 * @difficulty medium
 * @tags 哈希表,字符串,排序
 * @time O(n*k*log k)
 * @space O(n*k)
 * @note 排序后的字符串当哈希键分组
 * @49. 字母异位词分组
 */
var groupAnagrams = function (strs: string) {
    if (strs.length === 0) {
        return [['']]
    }
    if (strs.length === 1) {
        return [[`${strs[0]}`]]
    }
    let n = 0
    let res = []
    let map = new Map()
    //把排序后的字符串写入map，绑定一个序号
    for (let i = 0; i < strs.length; i++) {
        let str = strs[i].split('').sort().join('')
        if (map.has(str)) {
            res[map.get(str)].push(strs[i])
        } else {
            map.set(str, n)
            n++
            res.push([strs[i]])
        }
    }

    return res



};