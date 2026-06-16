
let obj = { "a": undefined, "b": 3 }

console.log(JSON.stringify(obj)) // undefind的属性会消失

var undefinedToNull = function (obj) {
    let keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
        if (obj[keys[i]] instanceof Object) {
            undefinedToNull(obj[keys[i]])
        } else if (obj[keys[i]] === undefined) {
            obj[keys[i]] = null
        }
    }
    return obj
};

console.log(undefinedToNull(obj))