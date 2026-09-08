/**
 * @回文质数
 * 给你一个整数 n ，返回大于或等于 n 的最小 回文质数。
 * 
 * 不能暴力
 * 子题： 下一个回文数
 */

var primePalindrome = function (n) {
    // 判断一个数是不是素数
    const isPrime = x => {
        if (x < 2) return 0
        for (let i = 2; i * i <= x; i++) {
            if (x % i == 0) return 0
        }
        return 1
    }
    // 由于n<=10^8  所以回文部分字符最长为4
    // 从一位 两位 三位 四位 依次构造不同长度的回文串，进行尝试
    for (let i = 1; i <= 5; i++) {
        // 尝试奇数位的回文数
        // 回文部分一位的话，j = 1 2 3 4 5 6...
        // 回文部分两位的话  j = 11 12 13 14 ...
        for (let j = 10 ** (i - 1); j < 10 ** i; j++) {
            let tmp = j + ''
            let val = tmp, ind = i - 2
            // tmp为奇数回文的前半部分，则将前i-1翻转拼接到tmp后面，构成回文串
            while (ind >= 0) val += tmp[ind--]
            let num = +val
            // 转成数字后，看是否符合条件
            if (num >= n && isPrime(num)) {
                return num
            }
        }
        // 尝试偶数回文串
        for (let j = 10 ** (i - 1); j < 10 ** i; j++) {
            let tmp = j + ''
            let val = tmp, ind = i - 1
            // 偶数没有中心位置，需要翻转整个字符串进行构造
            while (ind >= 0) val += tmp[ind--]
            let num = +val
            if (num >= n && isPrime(num)) {
                return num
            }
        }
    }
};