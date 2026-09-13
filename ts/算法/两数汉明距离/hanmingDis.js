const ComputeHamming = (x, y) => {
    // 步骤1: 计算两个数的异或，相同位为0，不同位为1
    let xor = x ^ y;
    let distance = 0;
    // 步骤2: 统计xor中1的个数
    while (xor !== 0) {
        // 步骤3: 使用 x & (x-1) 技巧消除最右边的1
        xor = xor & (xor - 1);
        distance++;
    }

    return distance;

}

console.log(ComputeHamming(1, 4)) // 输出2