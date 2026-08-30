import { MyPromise } from './MyPromise.js'

let p = new MyPromise((resolve, reject) => reject('完成'))
p.then((value) => console.log(value))
    .catch((e) => console.log(e))