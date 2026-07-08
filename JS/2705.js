/**
 * 精简对象
 * 
 */

console.log(typeof []) // object
console.log(typeof {})

console.log([] instanceof Array)
console.log({} instanceof Array)

console.log(Boolean([]))
console.log(Boolean(null))
console.log(Boolean(undefined))

console.log(typeof null) //object
console.log(typeof undefined) //object


var compactObject = function (obj) {

    if (obj instanceof Array) {
        for (let i = 0; i < obj.length; i++) {
            if (typeof obj[i] === 'object' && obj[i] !== null) {
                compactObject(obj[i])
                continue
            }
            if (!Boolean(obj[i])) {
                obj.splice(i, 1)
                i--
            }
        }

    } else {
        for (const k of Object.keys(obj)) {
            if (typeof obj[k] === 'object' && obj[k]!==null) {
                compactObject(obj[k])
                continue
            }

            if (!Boolean(obj[k])) {
                delete obj[k]
            }

        }
    }
    return obj
};

let arr = [null, 0, false, 1]
let arr1=[null, 0, 5, [0], [false, 16]]
let obj = {"a": null, "b": [false, 1]}
console.log(compactObject(arr))
console.log(compactObject(arr1))
console.log(compactObject(obj))