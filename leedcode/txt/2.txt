// 把l当数组用了
l1 = [1, 2, 3];
l2 = [4, 5, 6];

let num1 = 0;
let num2 = 0;
let num3 = 0;
let l3 = [];
for (let i = l1.length - 1; i >= 0; i--) {
    num1 += l1[i] * (Math.pow(10, i));
}
for (let i = l2.length - 1; i >= 0; i--) {
    num2 += l2[i] * (Math.pow(10, i));
}
num3 = num1 + num2;

num3 = Array.from(num3.toString());
console.log(num3);
// console.log(l3);
for (let i = 0; i < num3.length; i++) {
    l3[num3.length - 1 - i] = Number(num3[i]);
}
console.log(l3);
