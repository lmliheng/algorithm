/**
 * @不同的子序列2
 * 
 * 1. s里字符都是小写
 * 2. 使用arr记录以某字母结尾的不同子序列总数，
 * 例如遍历到s[3]是a，那么查找arr数组下的所有非零元素 加到sum，也就是a加到气候，然后a本身也算一个，所以arr[0]=(sum+1)
 * 
 * 
 */

function distinctSubseqII(s) {
    const MOD = 1000000007
    let res = 0
    // 记录以某字母结尾的不同子序列总数
    let arr = Array.from({ length: 26 }, () => 0)
    for (let i = 0; i < s.length; i++) {
        let index = s.charCodeAt(i) - 97
        let sum = 0
        for (let j = 0; j < 26; j++) {
            sum = (sum + arr[j]) % MOD
        }
        arr[index] = (sum + 1) % MOD
    }
    for (let i = 0; i < 26; i++) {
        res = (res + arr[i]) % MOD;
    }

    return res;
};