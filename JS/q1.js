/**
 * @param {number} n
 * @param {number} x
 * @return {boolean}
 */
var validDigit = function(n, x) {
    let n_str=n.toString()
    if((+n_str[0])===x){
        return false
    }
    for(let i=0;i<n_str;i++){
        if((+n_str[i])===x){
            return true
        }
    }
    return false
}

console.log(validDigit(123,3))
