/**
 * @跳跃游戏1
 */
let nums = [2,3,1,1,4]
//dp
let n=nums.length
let dp=new Array(n).fill(false)
dp[0]=true
for(let i=1;i<n;i++){
    for(let j=0;j<i;j++){
        if(dp[j]===true && nums[j]>=(i-j)){
            dp[i]=true
            break
        }
    }
}
console.log(dp)