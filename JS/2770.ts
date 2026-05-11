   let nums = [1,3,6,4,1,2]
   let target = 2
   // dp[i]表示跳到该索引对应元素所需的最大次数
    let n = nums.length
    let dp = new Array(n).fill(0)

    dp[0] = 0
    let set=new Set()
    set.add(0)

    // if(Math.abs(nums[1]-nums[0])<=2){
    //     dp[1]=dp[0]+1
    // }
    for (let i = 1; i < n; i++) {
       // console.log("i=",i)
        let max = 0
        for (let j = 0; j < i; j++) {
            if (Math.abs(nums[i] - nums[j]) <= target && set.has(j)) {
                set.add(i)
                max = Math.max(max, dp[j]+1)
            }
        }
        dp[i]=max
    }
   console.log(dp)
   console.log(set)
