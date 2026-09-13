/**
 * 冒泡排序
 * 
 */
export function BubbleSort(arr) {
    let n = arr.length
    for (let i = 0; i < n; i++) {
        let swap = false
        for (let j = 0; j < n - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
                swap = true
            }
        }
        if (!swap) {
            break
        }
    }
    return arr
}

// console.log(BubbleSort([1,2,6,2,4,1]))