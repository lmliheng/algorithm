import { quickSort2 } from "./快速排序.js";
import { BubbleSort } from "./冒泡排序.js";
import { mergeSort } from "./归并排序.js";
import { jsSort } from "./sort.js";

/**
 * 冒泡: 642.515ms
 * 快速: 12.515ms
 * 归并: 8.618ms
 * js sort: 0.47ms
 */

let arr = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 100000))

console.time('冒泡')
BubbleSort(arr)
console.timeEnd('冒泡')

console.time('快速')
quickSort2(arr)
console.timeEnd('快速')

console.time('归并')
mergeSort(arr)
console.timeEnd('归并')

console.time('js sort')
jsSort(arr)
console.timeEnd('js sort')