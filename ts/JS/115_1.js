/**
 * @不同的子序列个数
 * 双指针回溯...
 */
let s = "rabbbit"
let t = "rabbit"
let res = 0

const backtrack = (si, ti) => {
    if (ti === t.length) {
        res++
        return
    }
    if (si >= s.length) return
    // 跳过s[si]
    backtrack(si + 1, ti)
    // 如果匹配，则选择s[si]
    if (s[si] === t[ti]) {
        backtrack(si + 1, ti + 1)
    }
}

backtrack(0, 0)
console.log(res) // 3

// 初始状态: si=0, ti=0, res=0

// 第1步: backtrack(0,0)
// ├─ 跳过s[0]='r': backtrack(1,0)
// │  ├─ 跳过s[1]='a': backtrack(2,0)
// │  │  ├─ 跳过s[2]='b': backtrack(3,0)
// │  │  │  ├─ 跳过s[3]='b': backtrack(4,0)
// │  │  │  │  ├─ 跳过s[4]='b': backtrack(5,0)
// │  │  │  │  │  ├─ 跳过s[5]='i': backtrack(6,0)
// │  │  │  │  │  │  ├─ 跳过s[6]='t': backtrack(7,0) → si>=s.length, 返回
// │  │  │  │  │  │  └─ 匹配? s[6]='t' === t[0]='r'? No
// │  │  │  │  │  └─ 匹配? s[5]='i' === t[0]='r'? No
// │  │  │  │  └─ 匹配? s[4]='b' === t[0]='r'? No
// │  │  │  └─ 匹配? s[3]='b' === t[0]='r'? No
// │  │  └─ 匹配? s[2]='b' === t[0]='r'? No
// │  └─ 匹配? s[1]='a' === t[0]='r'? No
// └─ 匹配? s[0]='r' === t[0]='r'? Yes!
//    → backtrack(1,1)

// 第2步: backtrack(1,1)  [已匹配到t[0]='r']
// ├─ 跳过s[1]='a': backtrack(2,1)
// │  ├─ 跳过s[2]='b': backtrack(3,1)
// │  │  ├─ 跳过s[3]='b': backtrack(4,1)
// │  │  │  ├─ 跳过s[4]='b': backtrack(5,1)
// │  │  │  │  ├─ 跳过s[5]='i': backtrack(6,1)
// │  │  │  │  │  ├─ 跳过s[6]='t': backtrack(7,1) → 返回
// │  │  │  │  │  └─ 匹配? s[6]='t' === t[1]='a'? No
// │  │  │  │  └─ 匹配? s[5]='i' === t[1]='a'? No
// │  │  │  └─ 匹配? s[4]='b' === t[1]='a'? No
// │  │  └─ 匹配? s[3]='b' === t[1]='a'? No
// │  └─ 匹配? s[2]='b' === t[1]='a'? No
// └─ 匹配? s[1]='a' === t[1]='a'? Yes!
//    → backtrack(2,2)

// ...以此类推，最终找到3条路径:
// 1. s[0]r + s[1]a + s[2]b + s[3]b + s[5]i + s[6]t
// 2. s[0]r + s[1]a + s[2]b + s[4]b + s[5]i + s[6]t  
// 3. s[0]r + s[1]a + s[3]b + s[4]b + s[5]i + s[6]t