

let n=30
let isPrime=new Array(n).fill(true)

let prime=[]
isPrime[1]=false
isPrime[2]=true

for(let i=2;i*i<=n;i++){
    if(isPrime[i]){
        for(let j=i*i;j<=n;j+=i){
            console.log(j)
            isPrime[j]=false
        }
    }
}

for(let i=1;i<=n;i++){
    if(isPrime[i]){
        prime.push(i)
    }
}

console.log(prime)
