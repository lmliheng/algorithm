/**
 * @7-5力扣周赛题
 * 双指针
 */

function isSubsequence(s, t, skipIndex = -1) {
    let i = 0; // s 的指针
    let j = 0; // t 的指针

    while (i < s.length && j < t.length) {
        if (i === skipIndex) {
            // 当前位置被替换，视为匹配成功，直接跳过
            i++;
            j++;
        } else if (s[i] === t[j]) {
            i++;
            j++;
        } else {
            j++; // 在 t 中继续往后找
        }
    }

    return i === s.length; // 是否完整匹配完 s
}


 s = "cat", t = "chat"
// 1. 先尝试不替换
if (isSubsequence(s, t)) {
    console.log(true)
}

// 2. 逐个位置尝试替换
for (let i = 0; i < s.length; i++) {
    if (isSubsequence(s, t, i)) {
        console.log(i, true)
    }
}

