/**
 * @单面值组合的第K小金额
 */
function findKthSmallest(coins, k) {
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const n = coins.length;
  let left = 1;
  let right = Math.min(...coins) * k; // 上界

  function countUpTo(limit) {
    let cnt = 0;
    for (let mask = 1; mask < 1 << n; mask++) {
      let lcm = 1;
      let bits = 0;
      for (let i = 0; i < n; i++) {
        if (mask & (1 << i)) {
          lcm = (lcm / gcd(lcm, coins[i])) * coins[i];
          bits++;
          if (lcm > limit) break; // 剪枝
        }
      }
      if (lcm <= limit) {
        cnt += (bits % 2 === 1 ? 1 : -1) * Math.floor(limit / lcm);
      }
    }
    return cnt;
  }


  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (countUpTo(mid) >= k) right = mid;
    else left = mid + 1;
  }
  return left;
}


console.log(findKthSmallest([2,5],7))