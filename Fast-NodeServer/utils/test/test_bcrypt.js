const { ToHash, ComparePassword } = require('../crypto_password')

let password = '123456'
 ToHash(password).then(res => {
    console.log(res)
})

let hashedPassword = '$2b$10$hJgz2SAuG7vkZlmVGxqBCOA9qvSzl0snGQnVSLxzPc5e43.79D7iW'
ComparePassword(password, hashedPassword).then(res => {
    console.log(res)
})
