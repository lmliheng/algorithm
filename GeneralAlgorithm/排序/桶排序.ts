/**
 * @桶排序
 * 
 * 设置桶的大小，将数组元素均分到桶里，对每个桶的元素进行排序(使用归并)
 * 再合并桶..
 * 
 * 数据均匀分布时，效率高，接近O(n)
 */
function bucketSort(arr: number[], bucketSize: number = 5): number[] {
  if (arr.length <= 1) return arr;

  let min = arr[0], max = arr[0];
  for (let v of arr) {
    if (v < min) min = v;
    if (v > max) max = v;
  }

  const bucketCount = Math.floor((max - min) / bucketSize) + 1;
  const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

  for (let v of arr) {
    const idx = Math.floor((v - min) / bucketSize);
    buckets[idx].push(v);
  }

  const result: number[] = [];
  for (let bucket of buckets) {
    if (bucket.length > 0) {
      insertionSort(bucket);
      result.push(...bucket);
    }
  }

  return result;
}

function insertionSort(arr: number[]): number[] {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i], j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}
