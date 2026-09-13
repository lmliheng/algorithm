export const data1 = {
    s: 'bbc abcdab abcdabcdabde',
    p: 'abcdabd'
}

function randStr(n, seed = 7) {
  // 简单可复现伪随机，避免每次跑数据变
  let x = seed;
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let out = "";
  for (let i = 0; i < n; i++) {
    x = (x * 1103515245 + 12345) & 0x7fffffff;
    out += chars[x % 26];
  }
  return out;
}

const midS = randStr(100000, 7);          // 1e5 随机主串



export const data_mid = {
  s: midS,
  p: midS.slice(50000, 50007),            // 真实存在的一段，7 位
};

// console.log(data_mid)