/**
 * @6. Z 字形变换
 */

function convert(s:string, numRows:number) {

    if (numRows < 2) return s;
    const rows = new Array(numRows).fill('');
    let i = 0, flag = -1;

    for (let c of s) {
        // 将字符添加到当前行
        rows[i] += c;

        // 到达边界时反转方向
        if (i === 0 || i === numRows - 1) {
            flag = -flag;
        }

        // 更新行索引
        i += flag;
    }

    return rows.join('');
};