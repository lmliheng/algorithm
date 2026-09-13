/**
 * @大于目标字符串的最小字典序排列
 * 
 * 是s>target 不是每一个s[i]>target[i]
 * 
 * 
 */


/**
 * @贪心
 * 先对s进行排序
 */
function lexGreaterPermutation(s, target) {
    const n = s.length;
    // left = s 的字符计数
    const left = new Array(26).fill(0);
    for (const ch of s) left[ch.charCodeAt(0) - 97]++;

    // 先假设前缀全等于 target，把 target 各字符从 left 扣除
    for (const ch of target) {
        left[ch.charCodeAt(0) - 97]--;
    }

    // 从右往左找可放大位置
    for (let i = n - 1; i >= 0; i--) {
        const c = target[i];
        const ci = c.charCodeAt(0) - 97;
        left[ci]++; // 撤销 target[i] 的消耗，回到“前缀 [0,i-1] 已固定”的状态

        // 检查前缀 [0,i-1] 是否还能凑出来（left 无负数）
        if (left.some(v => v < 0)) continue;

        // 在剩余字符里找比 c 大的最小字符
        for (let j = ci + 1; j < 26; j++) {
            if (left[j] === 0) continue;

            // 找到转折字符
            left[j]--;
            const ans = target.slice(0, i).split(''); // 前缀照抄
            ans.push(String.fromCharCode(97 + j));     // 第 i 位放大

            // 剩余字符升序铺满
            for (let k = 0; k < 26; k++) {
                for (let cnt = 0; cnt < left[k]; cnt++) {
                    ans.push(String.fromCharCode(97 + k));
                }
            }
            return ans.join('');
        }
        // 当前 i 放大失败，继续往左
    }
    return "";
}


/**
 * 
 * @走弯路了，不应该使用回溯
 */
function lexGreaterPermutation(s, target) {
    let n = s.length
    let res = []
    s = s.split('').sort().join('')
    let visit = Array.from({ length: n }, () => false)
    let flag = 1
    const BackTrack = (path) => {
        if (flag == 0) {
            return
        }
        if (path.length == n) {
            if (path.join('') > target) {
                res.push(path.join(''))
                flag = 0
            }
            return
        }
        for (let i = 0; i < n; i++) {
            if (visit[i]) { continue }
            visit[i] = true
            path.push(s[i])
            BackTrack(path)
            path.pop()
            visit[i] = false
        }
    }
    BackTrack([])
    if (res.length === 0) {
        return ''
    }
    console.log(res)
    return res[0]

};

