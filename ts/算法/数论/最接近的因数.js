/**
 * @最接近的因数
 * 
 * 均值不等式可知 a+b>=2*sqrt(a*b)，两个数和固定的情况下，两数越接近，他们的乘积越大。
 * 所以，直接先开根号，然后递减遍历，当数字可以被sum整除，就可以直接返回了，不需要继续遍历，这个时候得到的乘积，一定是最大的。
 */

export function closestDivisors(num) {
    function closestPair(n) {
        let i = Math.floor(Math.sqrt(n));
        while (n % i !== 0) i--;  
        return [i, n / i];
    }
    
    const pair1 = closestPair(num + 1);
    const pair2 = closestPair(num + 2);
    const diff1 = Math.abs(pair1[0] - pair1[1]);
    const diff2 = Math.abs(pair2[0] - pair2[1]);
    return diff1 < diff2 ? pair1 : pair2;
};