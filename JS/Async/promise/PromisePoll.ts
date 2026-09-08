/**
 * @Promise对象池
 * 
 * 
 */


async function promisePool(functions: Function[], n: number) {
    let i = 0
    const work = async () => {
        while (i < functions.length) {
            const idx = i++
            await functions[idx]!()
        }
    }
    // 数组内放n个work并发执行
    await Promise.all(Array(n).fill(0).map(() => work))
}


if (process.argv[2] == 'test') {

    const tasks = [
        () => new Promise(r => { console.log('A start'); setTimeout(() => { console.log('A done'); r(1) }, 1000) }),
        () => new Promise(r => { console.log('B start'); setTimeout(() => { console.log('B done'); r(2) }, 500) }),
        () => new Promise(r => { console.log('C start'); setTimeout(() => { console.log('C done'); r(2) },1500) }),
    ]

    console.log('start')
    promisePool(tasks, 2).then(() => console.log('all done'))
}















