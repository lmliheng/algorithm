/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
    const map = new Map()
    nums.forEach((n) => {
        map.set(n,map.has(n)?map.get(n)+1:1)
        console.log(map)
    })
    list = [...map]
    sortlist = list.sort((a,b) => b[1]-a[1]) // sort 会改变原数组，sort()或者sort(compareFunction)，具体参考MDN
  
    return sortlist.slice(0,k).map((item) => item[0])
    

};


console.log(topKFrequent([1,1,2,3,2,3,3,3,3,3,4],2))
