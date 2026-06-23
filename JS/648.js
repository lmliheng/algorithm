/**
 * @param {string} senate
 * @return {string}
 */
var predictPartyVictory = function (senate) {
    // rdd
    // rrdd
    let n = senate.length
    let r = []
    let d = []
    for (let i = 0; i < n; i++) {
        if (senate[i] === 'R') {
            r.push(i)
        } else {
            d.push(i)
        }
    }
    console.log(r, d)

    while (r.length !== 0 && d.length !== 0) {
        //。。。
        let a = r.shift()
        let b = d.shift()
        if (a < b) {
            r.push(a + n)
        } else {
            d.push(b + n)
        }
    }
    return r.length === 0 ? "Dire" : "Radiant"
};