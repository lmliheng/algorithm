/**
 * @串联所有单词的子串
 * 
 * 滑动窗口+哈希表
 */

let s = "barfoothefoobarman"
let words = ["foo", "bar"]

const res = [];
if (!s || s.length === 0 || !words || words.length === 0) return res;

const wordLen = words[0].length;
const wordNum = words.length;
const map = new Map();

for (const word of words) {
    map.set(word, (map.get(word) || 0) + 1);
}

for (let i = 0; i < wordLen; i++) {
    let left = i, right = i, count = 0;
    const tmpMap = new Map();

    while (right + wordLen <= s.length) {
        const w = s.slice(right, right + wordLen);
        tmpMap.set(w, (tmpMap.get(w) || 0) + 1);
        right += wordLen;
        count++;
        while ((tmpMap.get(w) || 0) > (map.get(w) ?? 0)) {

            const tw = s.slice(left, left + wordLen);
            tmpMap.set(tw, tmpMap.get(tw) - 1);
            left += wordLen;
            count--;
        }

        if (count === wordNum) res.push(left);
    }
}


console.log(res)