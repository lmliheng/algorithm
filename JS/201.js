let left = 6 // 0100 0101 0110
let right = 7 //0111 1000

const TenTotwo = function (num) {
    let stack = []
    while (num > 0) {
        stack.unshift(num % 2)
        num = Math.floor(num / 2)
    }
    if (stack.length == 0) {
        stack.unshift(0)
    }

    return stack.join('')
}
let leftStr = TenTotwo(left)
let rightStr = TenTotwo(right)

if (!(leftStr.length===rightStr.length)) {
    console.log(0)
} else {
     for(let i=(1<<30);i>=1;i>>=1){
        if((left&i)!==(right&i))
        {
            console.log(i)
            console.log(Math.floor(left/i)*i)
            break
        }
        
     }
   


}


