import { describe, it } from 'node:test'
import assert from 'node:assert'

import { phoneRegex } from '../正则表达式.js'

describe('测试电话号码正则', () => {
    it('1', () => {
        assert.strictEqual(phoneRegex.test(18322), false)
    }),
        it('2', () => {
            assert.strictEqual(phoneRegex.test(13551458597), true)
        })

})