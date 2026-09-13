
/**
 * @事件订阅器
 */
class EventEmitter {
    constructor() {
        this.eventMap = new Map()
    }
    /**
     * @param {string} eventName
     * @param {Function} callback
     * @return {Object}
     */
    subscribe(eventName, callback) {
        if (this.eventMap.has(eventName)) {
            let cbs = this.eventMap.get(eventName)
            cbs.push(callback)
            this.eventMap.set(eventName, cbs)
        } else {
            this.eventMap.set(eventName, [callback])
        }

        return {
            unsubscribe: () => {
                let name = eventName
                let cb = callback
                let arr = this.eventMap.get(name)
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] == callback) {
                        arr.splice(i, 1)
                    }
                }
                this.eventMap.set(eventName, arr)
            }
        };
    }

    /**
     * @param {string} eventName
     * @param {Array} args
     * @return {Array}
     */
    emit(eventName, args = []) {
        let res = []
        if (!this.eventMap.has(eventName)) {
            return []
        }
        let cbs = this.eventMap.get(eventName)
        for (let i = 0; i < cbs.length; i++) {
            res.push(cbs[i](...args))
        }
        return res

    }
}


const emitter = new EventEmitter();
// Subscribe to the onClick event with onClickCallback
function onClickCallback() { return 99 }

const sub = emitter.subscribe('onClick', onClickCallback);

const sub2 = emitter.subscribe('test', (...args) => args);

const sub3 = emitter.subscribe('onClick', (a) => a + 100);

console.log(sub)
console.log(emitter)
console.log(emitter.emit('onClick')) // [99]
sub.unsubscribe(); // undefined
console.log(emitter.emit('onClick')) //[0]

console.log(emitter.emit('test', [1, 3, {}]))