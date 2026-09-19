

// 有N台主机，每台主机有M个维度的特征值。按K批依次输出主机号，每批输出数量尽量均匀（前若干批多一个）。每批从剩余未输出的主机中，选择特色分数最高的主机输出，特色分数为该主机所有特征值中之前从未出现过的特征值的个数；若分数相同，则选择主机号较小的。已被输出的主机不再参与后续输出，且其所有特征值均计入全局已出现特征集合。
// S=[N/K],R=N%k,分批次前K-R批有S个主机，后R批有S+1

// 输入格式：
// 第一行两个整数N和M；接下来N行每行第一个整数为主机号，后面M个字符串为各维度特征值；
// 最后一行一个整数K表示分批次数。

// 输出格式：
// 共K行，每行若干个空格分隔的主机号，表示该批输出的主机。
// 输入

// 输入：
// 10 2
// 0 A1 B1
// 1 A1 B1
// 2 A2 B1
// 3 A1 B2
// 4 A3 B1
// 5 A2 B2
// 6 A3 B3
// 7 A4 B1
// 8 A4 B2
// 9 A4 B3
// 3

// 输出：
// 2 3 4 
// 6 0 5 
// 7 8 1 9 

/**
 * bash: tsx 华为.1 < example/华为.1.txt 
 */

process.stdin.resume();
process.stdin.setEncoding('utf-8');
let input = '';
process.stdin.on('data', (data) => {
    input += data;
});
process.stdin.on('end', () => {
    
    let inputArray = input.trim().split('\n');

    let len = inputArray.length;
    let [n, m] = inputArray[0].split(' ').map(Number); // 主机数 和 维度
    let k = +inputArray[len - 1]; // 分批次数
    
    // 解析主机数据
    let hosts = inputArray.slice(1, len - 1).map(item => {
        let parts = item.split(' ');
        return {
            id: +parts[0],
            features: parts.slice(1)
        };
    });

    let visited = Array.from({ length: n }, () => false);
    let featureSet = new Set();
    
    // 计算每批数量：前K-R批有S个，后R批有S+1个
    let S = Math.floor(n / k);
    let R = n % k;
    let batchSizes = [];
    for (let i = 0; i < k; i++) {
        if (i < k - R) {
            batchSizes.push(S);
        } else {
            batchSizes.push(S + 1);
        }
    }

    // 逐批处理
    for (let batch = 0; batch < k; batch++) {
        let needCount = batchSizes[batch];
        let result = [];
        
        // 每一批重新计算所有未访问主机的分数并排序
        while (result.length < needCount) {
            let candidates = [];
            
            for (let j = 0; j < n; j++) {
                if (visited[j]) continue;
                
                let score = 0;

                for (let feat of hosts[j].features) {
                    if (!featureSet.has(feat)) {
                        score++;
                    }
                }
                candidates.push({
                    idx: j,
                    id: hosts[j].id,
                    score: score
                });
            }
            
            // 按分数降序，相同分数按ID升序
            candidates.sort((a, b) => {
                if (b.score !== a.score) return b.score - a.score;
                return a.id - b.id;
            });
            
            // 选择分数最高的主机
            let selected = candidates[0];
            visited[selected.idx] = true;
            result.push(selected.id);
            
            // 将该主机的所有特征加入全局集合
            for (let feat of hosts[selected.idx].features) {
                featureSet.add(feat);
            }
            
        }
        
        console.log(result.join(' '));
    }

    process.exit();
});