/**
 * @IP地址转十进制
 * 
 * 涉及二进制乘法优化可以使用位运算的左移
 * 192.168.1.1转十进制就是192*(256^3)+168*(256^2)+1*(256^1)+1*1
 * 
 */

function ipToDecimal1(ip) {
    //检查ip
    return ip.split('.')
        .reduce((res, octet) => 256 * res + (+octet), 0)
}

/**
 * @位运算要快很多
 *  (res << 8) + Number(octet)和256*res + (+octet) 等价
 * 如果只是用(res << 8) 生成32位有符号整数，使得ipv4最大地址255.xx对应十进制是4294967295 大于 2^31-1
 * 所以这里的需要将res变成无符号>>>0
 */
function ipToDecimal2(ip) {
    return ip.split('.')
        .reduce((res, octet) => ((res >>> 0) << 8) + Number(octet), 0) >>> 0;
}

console.time('pow')
console.log(ipToDecimal1('192.168.1.1'))
console.timeEnd('pow')

console.time('位运算')
console.log(ipToDecimal2('192.168.1.1'))
console.timeEnd('位运算')