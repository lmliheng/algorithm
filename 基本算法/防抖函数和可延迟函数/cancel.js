/**
 * @延迟函数
 */
var cancellable = function (fn, args, t) {
    // 这里的apply null...
    let timer = setTimeout( () =>{fn.apply(null,args)} , t)
    return () => {
        clearTimeout(timer)
    }
};

let cancelFn = cancellable((a, b) => console.log(a,b), [1, 2], 5000)
setTimeout(cancelFn,3000)
