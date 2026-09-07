
// 符号	描述	运算规则
// &	与	两个位都为1时，结果才为1
// |	或	两个位都为0时，结果才为0
// ^	异或	两个位相同为0，相异为1
// ~	取反	0变1，1变0
// <<	左移	各二进位全部左移若干位，高位丢弃，低位补0
// >>	右移	各二进位全部右移若干位，高位补0或符号位补齐


let n = 9
if (n & 1 == 1) {
    console.log(n, '是奇数')
    // n 是个奇数。
}

let a = 10
let b = 1

// 交换两个数
a = a ^ b;//a=a^b
b = a ^ b;//b=(a^b)^b=a^0=a
a = a ^ b;//a=(a^b)^(a^b^b)=0^b=0

console.log(a, b)



let c = 10

console.log(a & c) //0
console.log(a & 0)//0
console.log(a | c)//11
console.log(a | 0)//1

console.log(a << 3)

for (let i = 0; i < (1 << n); i++) //从0～2^n-1个状态
{

    for (let j = 0; j < n; j++) //遍历二进制的每一位 共n位
    {
        if (i & (1 << j))//判断二进制数字i的第j位是否存在
        {
            // console.log(i & (1 << j))
            //操作或者输出
        }
    }
}