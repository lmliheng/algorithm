// 从最后一位n-1位开始遍历，从数组中从0到n-1随机选择一个数（包括n-1）
// 选出来之后和最后一位元素交换位置。直到遍历完整个数组
let arr = [1, 2, 3, 4, 7, 9];
for (let i = arr.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));  
    console.log(j);
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

console.log(arr);