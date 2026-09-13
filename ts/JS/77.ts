let n=4
let k=3
let res:number[][]=[]

const backtrack=(start:number,path:number[])=>{
    if(path.length==k){
        res.push([...path])
        return
    }

    for(let i=start;i<=n;i++){
        path.push(i)
        backtrack(i+1,path)
        path.pop()
    }

}

backtrack(1, [])

console.log(res)