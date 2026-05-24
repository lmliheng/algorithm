const { ToHash, ComparePassword } = require('../crypto_password')

//- 使用了 require (CommonJS 语法)
//- 同时在顶层使用了 await (ES Modules 语法)


async function test() {
    // 测试密码加密
    const testPassword = '123456'
    const hashedPassword = ToHash(testPassword)
    console.log('加密后的密码:', hashedPassword);
    // 测试密码验证
    const isPasswordValid = ComparePassword(testPassword, hashedPassword)
    console.log('密码验证结果:', isPasswordValid);
 

}
test()