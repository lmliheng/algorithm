/**
 * @difficulty medium
 * @tags 贪心,排序,数组
 * @time O(n^2)
 * @space O(n)
 * @note 身高降序、k 升序排序后逐个插到第 k 位
 * @406. 根据身高重建队列
 */
/**
 * @脑筋急转弯
 * @难题
 *
 *
 */

let people = [[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]]
let res: number[][] = []
people.sort((a, b) => {
    if (a[0] === b[0]) {
        return a[1] - b[1]
    } else {
        return b[0] - a[0]
    }
})
console.log(people)
for (let i = 0; i < people.length; i++) {
    res.splice(people[i][1], 0, people[i]) // 插入
}

console.log(res)
