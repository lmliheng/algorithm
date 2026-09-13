import { Cancellable } from './Cancellable.js'

let fn = new Promise((resolve, reject) => {
    setTimeout(() => resolve('完成'), 3000)
})

if (process.argv[2] == 'run') {
    fn.then((value) => console.log(value), (reason) => console.log(reason))
}

if (process.argv[2] == 'cancel') {
    const { promise, cancel } = Cancellable(fn)
    promise.then((value) => console.log(value), (reason) => console.log(reason))
    cancel()
}
