import { data1, data_mid } from "./data.js";

/**
 * @对比这些函数性能
 */
// const { s, p } = data1
const { s, p } = data_mid
console.log(s.length,p.length)
console.time("kmp");
kmp(s, p);
console.timeEnd("kmp");
console.time("bm");
bm(s, p);
console.timeEnd("bm");


function bm(s, p) {
    const n = s.length;
    const m = p.length;
    if (m === 0) return 0;

    const bc = generateBC(p);
    const { suffix, prefix } = generateGS(p);

    let i = 0; // 主串对齐位置
    while (i <= n - m) {
        let j = m - 1; // 从后往前比
        while (j >= 0 && s[i + j] === p[j]) {
            j--;
        }
        if (j < 0) {
            return i; // 匹配成功
        }
        // 坏字符规则
        const x = j - bc[s.charCodeAt(i + j)];
        // 好后缀规则
        let y = 0;
        if (j < m - 1) {
            y = moveByGS(j, m, suffix, prefix);
        }
        i += Math.max(x, y);
    }
    return -1;
}

// 坏字符表：字符 -> 模式串中最右位置
function generateBC(p) {
    const bc = new Array(256).fill(-1);
    for (let i = 0; i < p.length; i++) {
        bc[p.charCodeAt(i)] = i; // 多次出现取最右
    }
    return bc;
}

// 好后缀：suffix / prefix
function generateGS(p) {
    const m = p.length;
    const suffix = new Array(m).fill(-1);
    const prefix = new Array(m).fill(false);

    for (let i = 0; i < m - 1; i++) {
        let j = i;
        let k = 0;
        // 从 i 往前，和模式串后缀比
        while (j >= 0 && p[j] === p[m - 1 - k]) {
            j--;
            k++;
            suffix[k] = j + 1; // 公共后缀起始位置
        }
        if (j === -1) prefix[k] = true; // 同时也是前缀
    }
    return { suffix, prefix };
}

// 好后缀移动距离
function moveByGS(j, m, suffix, prefix) {
    const k = m - 1 - j; // 好后缀长度
    if (suffix[k] !== -1) {
        return j - suffix[k] + 1;
    }
    for (let r = j + 2; r <= m - 1; r++) {
        if (prefix[m - r]) {
            return r;
        }
    }
    return m;
}


function generateArray(pattern) {
    let i = 0
    let j = -1
    let next = []
    next[0] = -1
    while (i < pattern.length) {
        if (j === -1 || pattern[i] === pattern[j]) {
            i++
            j++
            next[i] = j
        } else {
            j = next[j]
        }
    }
    return next
}

function kmp(s, pattern) {
    let next = generateArray(pattern)
    let i = 0
    let j = 0 // pattern上的指针
    while (i < s.length && j < pattern.length) {
        if (s[i] === pattern[j] || j === -1) {
            i++
            j++
        } else {
            j = next[j]
        }
    }
    if (j === pattern.length) {
        return i - j
    } else {
        return -1
    }
}