const z = require('zod')
/**
 * @zod 
 * 左德
 */
const schema = z.url()
schema.parse('https://example.com')

schema.parse('s1') // zod error