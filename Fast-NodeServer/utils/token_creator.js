const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const tokenCreator = (user) => {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token
}

const tokenValidator = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
}
module.exports = {
    tokenCreator, tokenValidator
}
