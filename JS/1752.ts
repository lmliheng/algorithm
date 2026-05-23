 let nums = [3,4,5,1,2]
 
 let MinIndex = nums.indexOf(Math.min(...nums))
 let length = nums.length
    for (let i = MinIndex; i < length+1; i++) {
        let popNum  = nums.pop()
        nums.unshift(popNum as number)
    }

    const checkIncrease=(arr:number[])=>{
        for(let i=0;i<arr.length-1;i++){
            if(arr[i]>arr[i+1]){
                return false

            }
        }
        return true
    }

   console.log(checkIncrease(nums))