import { largest1BorderedSquare1, largest1BorderedSquare2, largest1BorderedSquare3 } from '../Array/最大的以1为边界的正方形.js'
import { describe, it } from 'node:test'
import { strictEqual } from 'assert'
/**
 * @最大的以1为边界的正方形
 * 
 */

let grid = [[1, 1, 0], [1, 0, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 0], [1, 1, 1], [1, 1, 0]]

describe('最大的以1为边界的正方形', () => {
    it('暴力解法:', () => {
        strictEqual(largest1BorderedSquare1(grid), 9)
    }),
        it('构造数组解法:', () => {
            strictEqual(largest1BorderedSquare2(grid), 9)
        }),
        it('动态规划:', () => {
            strictEqual(largest1BorderedSquare3(grid), 9)
        })


})