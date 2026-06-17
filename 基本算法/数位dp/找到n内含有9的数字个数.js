// 数位DP（动态规划）的思想，用于统计 [0, n]范围内含数字9的数的个数

function countNumbersWith9(n) {
    const s = String(n);
    const len = s.length;
    let count = 0;
    
    for (let i = 0; i < len; i++) {
        const digit = parseInt(s[i]);
        const remaining = len - i - 1;
        
        // 当前位可以取 0 到 digit-1
        // 如果 digit > 9 才需要减1，但digit最大为9，所以就是digit个
        const choices = digit;  // 可取 0,1,...,digit-1 共digit个
        count += choices * Math.pow(9, remaining);
        
        if (digit === 9) {
            return n + 1 - count;
        }
    }
    
    count++;
    return n + 1 - count;
}

console.log(countNumbersWith9(9))