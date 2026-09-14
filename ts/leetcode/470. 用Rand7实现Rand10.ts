/**
 * @470. 用Rand7实现Rand10
 */
/**
 * The rand7() API is already defined for you.
 * var rand7 = function() {}
 * @return {number} a random integer in the range 1 to 7
 */
declare function rand7(): number;

var rand10 = function (): number {
    let res=0
    while (true) {
        res = (rand7() - 1) * 7 + rand7()//构造1~49的均匀分布
        if (res <= 40) {
            break
        } //剔除大于40的值，1 - 40等概率出现。
    }

    return res % 10 + 1//构造1 - 10的均匀分布
};
