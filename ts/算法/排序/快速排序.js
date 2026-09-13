/**
 * @快速排序1
 * 原地快速排序
 * 
 * @对重复元素不敏感属于Lumoto分区
 */

export function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left >= right) {
        return arr
    }

    const pivotIndex = partition(arr, left, right)
    quickSort(arr, left, pivotIndex - 1)
    quickSort(arr, pivotIndex + 1, right)
    return arr

}

function partition(arr, left, right) {
    const pivot = arr[right]
    let i = left
    for (let j = left; j < right; j++) {
        if (arr[j] < pivot) {
            [arr[i], arr[j]] = [arr[j], arr[i]]
            i++
        }
    }
    [arr[i], arr[right]] = [arr[right], arr[i]]
    return i
}

// console.log(quickSort([1, 2, 6, 2, 4, 1]));



/**
 * @
 */
export function quickSort2(arr) {
    function sort(left, right) {
        if (left >= right) return;

        // 随机 pivot，防止有序数组退化
        const rand = Math.floor(Math.random() * (right - left + 1)) + left;
        [arr[rand], arr[right]] = [arr[right], arr[rand]];

        const pivot = arr[right];
        let i = left;
        for (let j = left; j < right; j++) {
            if (arr[j] < pivot) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                i++;
            }
        }

        [arr[i], arr[right]] = [arr[right], arr[i]];
        sort(left, i - 1);
        sort(i + 1, right);
    }

    sort(0, arr.length - 1);
    return arr;
}