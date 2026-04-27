/**
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function (s) {
    const garph = {
        0: { 'blank': 0, 'sign': 1, 'dot': 2, 'digit': 6 },
        1: { 'digit': 6, 'dot': 2 },
        2: { 'digit': 3 },
        3: { 'digit': 3, 'e': 4 },
        4: { 'digit': 5, 'sign': 7 },
        5: { 'digit': 5 },
        6: { 'dot': 3, 'e': 4, 'digit': 6 },
        7: { 'digit': 5 },
    }

    let state = 0;
    for (c of s.trim()) {
        if (c >= '0' && c <= '9') {
            c = 'digit';
        }
        else if (c === ' ') {
            c = 'blank';
        }
        else if (c === '+' || c === '-') {
            c = 'sign';
        }
        else if (c === 'e' || c === 'E') {
            c = 'e';
        } else if (c === '.') {
            c = 'dot';
        }
        state = garph[state][c];
        if (state === undefined) {
            return false;
        }
    }
    if (state === 6 || state === 5 || state === 3) {
        return true;
    } else {
        return false;
    }
};

console.log(isNumber("0.1"))