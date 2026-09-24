/**
 * @454. 四数相加 II
 * 
 * 
 */


/**
 * 
 * @哈希表O(n^2)
 */
function fourSumCount(nums1: number[], nums2: number[], nums3: number[], nums4: number[]): number {
    const twoSumMap = new Map();
    let count = 0;

    for (const n1 of nums1) {
        for (const n2 of nums2) {
            const sum = n1 + n2;
            twoSumMap.set(sum, (twoSumMap.get(sum) || 0) + 1)
        }
    }

    for (const n3 of nums3) {
        for (const n4 of nums4) {
            const sum = n3 + n4;
            count += (twoSumMap.get(0 - sum) || 0)
        }
    }

    return count;
};


/**
 * 
 * @暴力O(n^4)
 */
function fourSumCount1(nums1: number[], nums2: number[], nums3: number[], nums4: number[]): number {
    let n = nums1.length
    let res = 0
    nums1.sort()
    nums2.sort()
    nums3.sort()
    nums4.sort()

    if ((nums1[n - 1] + nums2[n - 1] + nums3[n - 1] + nums4[n - 1] < 0) || (nums1[0] + nums2[0] + nums3[0] + nums4[0] > 0)) {
        return res
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            for (let k = 0; k < n; k++) {
                for (let m = 0; m < n; m++) {
                    let sum = nums1[i] + nums2[j] + nums3[k] + nums4[m]
                    if (sum == 0) {
                        res++
                    } else if (sum > 0) {
                        break
                    }
                }
            }
        }
    }
    return res
};