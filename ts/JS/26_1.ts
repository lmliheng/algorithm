function removeDuplicates(nums: number[]): number {
let l=0
let r=1
while(r<nums.length){
    if(nums[l]==nums[r]){
        nums.splice(r,1)
       
        continue
    }else{
        l++
        r++
    } 
}
console.log(nums)
return nums.length
}

console.log(removeDuplicates([0, 0, 1, 1, 1, 2]))
