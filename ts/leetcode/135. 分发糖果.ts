/**
 * @135. 分发糖果
 * 左右循环，有思想高度
 */

function candy(ratings: number[]): number {
    const n: number = ratings.length;
    const left: number[] = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        if (i > 0 && ratings[i] > ratings[i - 1]) {
            left[i] = left[i - 1] + 1;
        } else {
            left[i] = 1;
        }
    }

    let right: number = 0, ret: number = 0;
    for (let i = n - 1; i > -1; i--) {
        if (i < n - 1 && ratings[i] > ratings[i + 1]) {
            right++;
        } else {
            right = 1;
        }
        ret += Math.max(left[i], right);
    }
    return ret;
}

let ratings: number[] = [1, 0, 2]
console.log(candy(ratings))

export {};
