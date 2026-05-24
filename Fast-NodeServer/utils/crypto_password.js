// const bcrypt = require('bcrypt')
// // 使用bcrypt加密
// const ToHash = async (password) => {
//     const salt = await bcrypt.genSalt(10);
//     return await bcrypt.hash(password, salt);
// }
// // 验证密码
// const ComparePassword = async (password, hashedPassword) => {
//     return await bcrypt.compare(password, hashedPassword);
// }

// module.exports = { ToHash, ComparePassword }

const crypto = require('crypto-js')
// 使用crypto-js加密
const ToHash = (password) => {
    return crypto.SHA256(password).toString()
}

const ComparePassword = (password, hashedPassword) => {
    return ToHash(password) === hashedPassword
}

module.exports = { ToHash, ComparePassword }
