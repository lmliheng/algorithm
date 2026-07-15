/**
 * @最大公约数
 */
function gcd(v1,v2){
    if(v2===0){return v1}
    return gcd(v2,v1%v2)
}

console.log(gcd(100,12))