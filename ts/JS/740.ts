
let nums = [2,2,3,3,3,4]
let map = new Map()
for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
        map.set(nums[i], map.get(nums[i]) + nums[i])
    } else {
        map.set(nums[i], nums[i])
    }
}
console.log(map)
// 构造数组
let MyArr=new Array(Math.max(...map.keys())+1).fill(0)

for(let i=0;i<MyArr.length;i++){
    MyArr[i]=map.get(i)?map.get(i):0
}
console.log(MyArr)

let dp=new Array(MyArr.length).fill(0)
dp[0]=MyArr[0]
dp[1]=Math.max(MyArr[1],MyArr[0])
for(let i=2;i<MyArr.length;i++){
    dp[i]=Math.max(...dp.slice(0,i-1))+MyArr[i]
}
console.log(dp)