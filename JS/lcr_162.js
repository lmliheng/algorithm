// 数字1的个数
let num = 2311

// 2310  个位数是1的个数有0-230 =》231

// 2311 个位数是1的个数有0-231 =》232

// 2313 个位数是1的个数有0-231

// 2300 十位数是1的个数：10-2219

// 有0-229 230

// 2310 10-2310

// 0-230 231

// 2330 10-2310

// 0-239 240

let digit = 1;  // 位数：个位、十位、百位...
let res = 0;    // 结果
let high = Math.floor(num / 10);  // 高位
let cur = num % 10;               // 当前位
let low = 0;                      // 低位

while (high !== 0 || cur !== 0) {
    if (cur === 0) {
        res += high * digit;
    } else if (cur === 1) {
        res += high * digit + low + 1;
    } else {
        res += (high + 1) * digit;
    }

    low += cur * digit;   // 更新低位
    cur = high % 10;      // 更新当前位
    high = Math.floor(high / 10);  // 更新高位
    digit *= 10;          // 位数提升
}

console.log(res)

