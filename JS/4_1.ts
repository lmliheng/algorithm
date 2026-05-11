    let nums1=[1,3,5]
    let nums2=[2,4,6]
    
    let num=[]
    num.push(...nums1,...nums2)
    num.sort((a,b)=>a-b)
    if(num.length%2==0){
        console.log((num[num.length/2-1]+num[num.length/2])/2)
    }else{
        console.log(num[Math.floor(num.length/2)])
    }