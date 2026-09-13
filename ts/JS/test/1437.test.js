import { describe, it } from 'node:test'
import { strictEqual } from 'assert'
import { kLengthApart } from '../1437.js'
describe('是否所有 1 都至少相隔 k 个元素', () => {
    it('1:', () => {
        strictEqual(kLengthApart([1, 0, 0, 1, 0, 1], 2), false)
    }),
        it('2:', () => {
            strictEqual(kLengthApart([1, 0, 0, 0, 1, 0, 0, 1], 2), true)
        }),
        it('2:', () => {
            strictEqual(kLengthApart([1, 0, 0, 0, 1, 0, 0, 1], 2), true)
        })
})