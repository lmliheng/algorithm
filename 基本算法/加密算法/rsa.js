// 代码段1: 工具函数
function modPow(base, exponent, modulus) {
  // 快速模幂运算
  let result = 1n;
  let b = BigInt(base) % BigInt(modulus);
  let e = BigInt(exponent);
  let m = BigInt(modulus);
  
  while (e > 0n) {
    if (e & 1n) {
      result = (result * b) % m;
    }
    b = (b * b) % m;
    e >>= 1n;
  }
  return Number(result);
}

function extendedEuclidean(a, b) {
  // 扩展欧几里得算法求模逆
  let [old_r, r] = [BigInt(a), BigInt(b)];
  let [old_s, s] = [1n, 0n];
  let [old_t, t] = [0n, 1n];
  
  while (r !== 0n) {
    const quotient = old_r / r;
    [old_r, r] = [r, old_r - quotient * r];
    [old_s, s] = [s, old_s - quotient * s];
    [old_t, t] = [t, old_t - quotient * t];
  }
  
  return { gcd: old_r, x: old_s, y: old_t };
}

// 代码段2: RSA密钥生成
function generateRSAKeys(bitLength = 32) {
  // 注意：真实场景应使用2048位以上，这里仅为演示
  function isPrimeBasic(n) {
    if (n <= 1n) return false;
    if (n <= 3n) return true;
    if (n % 2n === 0n || n % 3n === 0n) return false;
    for (let i = 5n; i * i <= n; i += 6n) {
      if (n % i === 0n || n % (i + 2n) === 0n) return false;
    }
    return true;
  }
  
  function generatePrime(bits) {
    while (true) {
      // 生成随机奇数
      const min = 1n << BigInt(bits - 1);
      const max = (1n << BigInt(bits)) - 1n;
      const randomNum = min + (BigInt(Math.floor(Math.random() * Number(max - min))) | 1n);
      
      if (isPrimeBasic(randomNum)) {
        return randomNum;
      }
    }
  }
  
  // 生成两个大质数
  const p = generatePrime(bitLength / 2);
  const q = generatePrime(bitLength / 2);
  
  if (p === q) {
    // 避免p=q
    return generateRSAKeys(bitLength);
  }
  
  const n = p * q;
  const phi = (p - 1n) * (q - 1n);
  
  // 选择e，通常为65537
  let e = 65537n;
  if (phi <= e) {
    e = 65537n; // 如果phi太小，可以选小一点的e
  }
  
  // 计算d = e⁻¹ mod φ(n)
  const { x: d } = extendedEuclidean(e, phi);
  const d_positive = d < 0n ? d + phi : d;
  
  return {
    publicKey: { e: Number(e), n: Number(n) },
    privateKey: { d: Number(d_positive), n: Number(n) },
    p: Number(p),
    q: Number(q),
    phi: Number(phi)
  };
}

// 代码段3: RSA加密
function rsaEncrypt(message, publicKey) {
  const { e, n } = publicKey;
  // 将字符串转换为数字
  const msgNum = Array.from(message)
    .map(c => c.charCodeAt(0))
    .reduce((acc, val) => (acc << 8) + val, 0);
  
  if (msgNum >= n) {
    throw new Error('Message too large for modulus. Use block encryption in real scenarios.');
  }
  
  return modPow(msgNum, e, n);
}

// 代码段4: RSA解密
function rsaDecrypt(ciphertext, privateKey) {
  const { d, n } = privateKey;
  const decryptedNum = modPow(ciphertext, d, n);
  
  // 将数字转换回字符串
  let temp = decryptedNum;
  const bytes = [];
  while (temp > 0) {
    bytes.unshift(temp & 0xFF);
    temp >>= 8;
  }
  return String.fromCharCode(...bytes);
}

const keys = generateRSAKeys();
console.log(keys);


const ciphertext = rsaEncrypt('Hell', keys.publicKey);
console.log('加密：', ciphertext);

const decryptedMessage = rsaDecrypt(ciphertext, keys.privateKey);
console.log('解密消息：', decryptedMessage);