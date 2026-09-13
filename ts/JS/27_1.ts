function removeElement(nums: number[], val: number): number {
 let r=0
 while(r<nums.length){
    if(nums[r]===val){
        nums.splice(r,1)
        
        continue
    }
    r++
 }
 return nums.length
};
console.log(removeElement([3, 2, 2, 3], 3))
