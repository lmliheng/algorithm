/**
 * @76. 最小覆盖子串
 *
 */

let nums: number[] = [1, 2, 3]

const ans: number[][] = [];
const n: number = nums.length;
for (let mask = 0; mask < (1 << n); ++mask) { // mask二进制是01序列

    const t: number[] = [];
    for (let i = 0; i < n; ++i) {
        if (mask & (1 << i)) {
            console.log(mask, i)
            t.push(nums[i]);
        }
    }
    ans.push(t);
}


console.log(ans)

export {};
