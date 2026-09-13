/**
 * @宏任务会在同步任务和微任务之后执行
 */




/**
 * @在i到3之后，setTimeout才开始执行回调
 */
function test1() {
    let i = 0
    for (i = 0; i < 3; i++) {
        setTimeout(() => console.log(i), 0)
    }
}
test1()