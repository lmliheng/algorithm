type Counter = {
    increment: () => number,
    decrement: () => number,
    reset: () => number,
}

function createCounter(init: number): Counter {
    let a=init
    let increment=()=>{
        a++
        return a
    }
    let decrement=()=>{
        a--
        return a
    }
    let reset=()=>{
        a=init
        return a
    }
    
    
    return {
        increment,
        decrement,
        reset
    }
};

let counter = createCounter(5)
console.log(counter.increment())
console.log(counter.increment())
console.log(counter.decrement())
console.log(counter.reset())
console.log(counter.increment())