
/**
 * @事件订阅器
 */
class EventEmitter {
    private eventMap: Map<string, Array<(...args: any[]) => any>> = new Map()

    showMap() {
        return this.eventMap
    }

    /**
     *@订阅事件
     */
    subscribe(eventName: string, callback: (...args: any[]) => any) {
        if (this.eventMap.has(eventName)) {
            let cbs = this.eventMap.get(eventName)!
            cbs.push(callback)
            this.eventMap.set(eventName, cbs)
        } else {
            this.eventMap.set(eventName, [callback])
        }

        return {
            unsubscribe: () => {

                let arr = this.eventMap.get(eventName)
                if (!arr) {
                    throw new Error('不存在这个事件')
                }
                const index = arr.indexOf(callback)
                if (index !== -1) {
                    // 拿到的是map内的地址
                    arr.splice(index, 1)
                }
                if (arr.length === 0) {
                    this.eventMap.delete(eventName)
                }
            }
        };
    }

    /**
     * @执行事件
     */
    emit(eventName: string, args: any[] = []) {
        let res = []
        if (!this.eventMap.has(eventName)) {
            return []
        }
        let cbs = this.eventMap.get(eventName)!
        for (let i = 0; i < cbs.length; i++) {
            res.push(cbs[i](...args))
        }
        return res
    }
}


if (process.argv[2] === 'test') {
    const emitter = new EventEmitter();
    // Subscribe to the onClick event with onClickCallback
    function onClickCallback() { return 99 }

    const sub = emitter.subscribe('onClick', onClickCallback);
    console.log(emitter.showMap())
    const sub2 = emitter.subscribe('test', (...args) => args);
    console.log(emitter.showMap())
    const sub3 = emitter.subscribe('onClick', () => 100);
    console.log(emitter.showMap())
    console.log(sub)

    console.log(emitter.emit('onClick')) // [99]

    sub.unsubscribe(); // undefined

    console.log(emitter.showMap())

    console.log(emitter.emit('onClick')) //[0]

    sub2.unsubscribe(); // undefined
    console.log(emitter.showMap())

    console.log(emitter.emit('test', [1, 3, {}]))
}

