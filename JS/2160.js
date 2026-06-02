let num = 4009

let numArr = num.toString().split('').sort((a, b) => a - b)
console.log((+(numArr[0] + numArr[2])) +(+ (numArr[1] + numArr[3])))


console.log("numArr:", numArr)