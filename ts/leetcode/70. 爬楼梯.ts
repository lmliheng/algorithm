/**
 * @70. 爬楼梯
 */

let n: number = 10
// (1/Math.sqrt(5))*(pow((1+Math.sqrt(5))/2,n+1)-pow((1-Math.sqrt(5))/2,n+1))
console.log(Math.floor((1/Math.sqrt(5))*(Math.pow((1+Math.sqrt(5))/2,n+1)-Math.pow((1-Math.sqrt(5))/2,n+1))))

/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n: number): number {
  // dp dp[n-1]表示n阶楼梯到达的方法数，n=1时
  let dp: number[] = new Array(n)
  dp[0] = 1
  dp[1] = 2
  for(let i=2;i<n;i++){
    dp[i] = dp[i-1] + dp[i-2]
  }

  return dp[n-1]
}

console.log(climbStairs(10))

export {};
