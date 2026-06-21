let nums = [3, 10, 5, 25, 2, 8]
const highBit = 31 - Math.clz32(Math.max(...nums)); // 最大数的二进位位数

const seen = new Set();

let ans = 0, mask = 0;
for (let i = highBit; i >= 0; i--) { // 从最高位开始枚举
    seen.clear();
    mask |= 1 << i;
    const newAns = ans | (1 << i); // 这个比特位可以是 1 吗？
    for (let x of nums) {
        x &= mask; // 低于 i 的比特位置为 0
        if (seen.has(newAns ^ x)) {
            ans = newAns; // 这个比特位可以是 1
            break;
        }
        seen.add(x);
    }
}


console.log(ans)

// 作者：灵茶山艾府
// 链接：https://leetcode.cn/problems/ms70jA/solutions/2689742/tu-jie-jian-ji-gao-xiao-yi-tu-miao-dong-q6y1a/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。