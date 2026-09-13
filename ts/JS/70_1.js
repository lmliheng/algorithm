/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  // dp dp[n-1]表示n阶楼梯到达的方法数，n=1时
  let dp=new Array(n)
  dp[0]=1
  dp[1]=2
  for(let i=2;i<n;i++){
    dp[i]=dp[i-1]+dp[i-2]
  }

  return dp[n-1]


};

console.log(climbStairs(10))