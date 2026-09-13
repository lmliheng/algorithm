function minOperations(s1, s2) {
    const n = s1.length;
    const melorvanti = []; // 存储中间状态
    
    // 统计s1和s2中1的个数
    let count1 = 0, count2 = 0;
    for (let i = 0; i < n; i++) {
        if (s1[i] === '1') count1++;
        if (s2[i] === '1') count2++;
    }
    
    // 关键观察：操作2只能减少1的个数（每次减2），操作1只能增加1的个数（每次加1）
    // 所以最终1的总数变化必须是可行的
    if ((count1 - count2) % 2 !== 0) return -1;
    
    let ops = 0;
    let i = 0;
    
    while (i < n) {
        // 记录当前状态用于演示
        melorvanti.push({
            step: ops,
            index: i,
            currentS1: s1.slice(0, i) + '[' + s1[i] + ']' + s1.slice(i + 1),
            target: s2
        });
        
        if (s1[i] === s2[i]) {
            i++;
            continue;
        }
        
        // s1[i] !== s2[i]
        if (s1[i] === '0') {
            // s1[i]是'0'，s2[i]是'1' → 需要用操作1
            // 代码段: 操作1 - 将s1[i]从'0'改为'1'
            s1 = s1.substring(0, i) + '1' + s1.substring(i + 1);
            ops++;
            i++;
        } else {
            // s1[i]是'1'，s2[i]是'0' → 需要把1变成0
            // 尝试用操作2消除一对连续的1
            if (i + 1 < n && s1[i + 1] === '1') {
                // 代码段: 操作2 - 将s1[i]和s1[i+1]从'11'改为'00'
                s1 = s1.substring(0, i) + '00' + s1.substring(i + 2);
                ops++;
                i += 2;
            } else {
                // 无法配对，需要借助后面的操作
                // 查找后面是否有可以配对的1
                let found = false;
                for (let j = i + 1; j < n; j++) {
                    if (s1[j] === '1') {
                        // 先把中间的0变成1（操作1），然后一起消掉
                        for (let k = i + 1; k < j; k++) {
                            if (s1[k] === '0') {
                                // 代码段: 操作1 - 创建桥梁
                                s1 = s1.substring(0, k) + '1' + s1.substring(k + 1);
                                ops++;
                            }
                        }
                        // 代码段: 操作2 - 消除这对1
                        s1 = s1.substring(0, i) + '00' + s1.substring(i + 2);
                        ops++;
                        i += 2;
                        found = true;
                        break;
                    }
                }
                if (!found) return -1;
            }
        }
    }
    
    console.log(melorvanti)
    return ops;
}

// 示例运行
const s1 = "1100";
const s2 = "0011";
console.log("输入:", s1, s2);
console.log("结果:", minOperations(s1, s2));