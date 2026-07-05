/**
 * @最大得分的路径数目
 * 返回一个列表，包含两个整数：第一个整数是 「得分」 的最大值，第二个整数是得到最大得分的方案数
 * 思路1：动态规划
 */
let board1 = [
    "E23",
    "2X2",
    "12S"
]

let m = board1.length
let n = board1[0].length

let res = []
