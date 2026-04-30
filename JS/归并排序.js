const mergeSort=(arr)=>{
    // 合并有序数组l,r
    const merge=(left,right)=>{
         let result = [];
         let i = 0, j = 0;
    // 比较两个数组的元素，依次放入结果数组
       while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    // 将剩余元素加入结果
    return result.concat(left.slice(i)).concat(right.slice(j));
    }

    if(arr.length==1){return arr}
    let mid=Math.floor(arr.length/2)
    let arrLeft=arr.slice(0,mid) 
    let arrRight=arr.slice(mid)
    return merge(mergeSort(arrLeft),mergeSort(arrRight))
}


console.log(mergeSort([1,25,1,35,6]))

