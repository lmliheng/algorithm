/**
 * @质因数分解
 * 
 */
function getPrimeFactors(num) {
    const factors = new Set();
    let d = 2;
    while (d * d <= num) {
        if (num % d === 0) {
            factors.add(d);
            while (num % d === 0) {
                num /= d;
            }
        }
        d++;
    }
    if (num > 1) factors.add(num);
    return factors;
}

console.log(getPrimeFactors(123))

