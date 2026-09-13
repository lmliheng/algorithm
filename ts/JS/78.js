let nums = [1, 2, 3]

const ans = [];
const n = nums.length;
for (let mask = 0; mask < (1 << n); ++mask) { // mask二进制是01序列

    const t = [];
    for (let i = 0; i < n; ++i) {
        if (mask & (1 << i)) {
            console.log(mask, i)
            t13.push(nums[i]);
        }
    }
    ans.push(t);
}


console.log(ans)
