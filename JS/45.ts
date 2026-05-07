   let nums=[1,2,3]
   let dp=new Array(nums.length).fill(0)
    const dp_equation=(i:number)=>{
        let res=[]
        
        for(let j=0;j<i;j++){
            if(nums[j]>=i-j){
                res.push(dp[j])
            }
        }
        console.log('此时的i',i,res)
        return Math.min(...res)+1
    }
    // 对比目标点前每一个点跳到目标点的dp值哪个最小选哪个,dp是跳跃次数
    dp[0]=0
    for(let i=1;i<nums.length;i++){
        dp[i]=dp_equation(i)
    }

console.log(dp)