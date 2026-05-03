"use strict";
// function check(num: number): boolean { // num=66
//     let arr=num.toString().split("")
//     let hasMapNum=0
//     for(let i=0;i<arr.length;i++){
//         if(map1.has(+(arr[i]))||map2.has(+(arr[i]))){
//             // 大前提
//             if(map1.has(+(arr[i]))){
//                 hasMapNum++
//             }
//         }else{
//             return false
//         }
Object.defineProperty(exports, "__esModule", { value: true });
//     }
//     if(hasMapNum==0){
//         return false
//     }
//     return true;
// }
let n = 857;
let map1 = new Map([[2, 5], [5, 2], [6, 9], [9, 6]]);
let map2 = new Map([[0, 0], [1, 1], [8, 8]]);
let res = 0;
const check = (num) => {
    let arr = num.toString().split("");
    let hasMapNum = 0;
    for (let i = 0; i < arr.length; i++) {
        if (map1.has(+(arr[i])) || map2.has(+(arr[i]))) {
            // 大前提
            if (map1.has(+(arr[i]))) {
                hasMapNum++;
            }
        }
        else {
            return false;
        }
    }
    if (hasMapNum == 0) {
        return false;
    }
    return true;
};
for (let i = 1; i <= n; i++) {
    if (check(i)) {
        // console.log(i, "是旋转数字");
        res++;
    }
}
console.log(res);
