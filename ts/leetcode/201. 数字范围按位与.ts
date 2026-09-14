/**
 * @201. 数字范围按位与
 */

let left: number = 6 // 0100 0101 0110
let right: number = 7 //0111 1000

const TenTotwo = function (num: number): string {
    let stack: number[] = []
    while (num > 0) {
        stack.unshift(num % 2)
        num = Math.floor(num / 2)
    }
    if (stack.length == 0) {
        stack.unshift(0)
    }

    return stack.join('')
}
let leftStr: string = TenTotwo(left)
let rightStr: string = TenTotwo(right)

if (!(leftStr.length===rightStr.length)) {
    console.log(0)
} else {
     for(let i: number = (1<<30);i>=1;i>>=1){
        if((left&i)!==(right&i))
        {
            console.log(i)
            console.log(Math.floor(left/i)*i)
            break
        }
        
     }
   


}

export {};
