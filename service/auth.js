const jwt = require("jsonwebtoken")
const secret = "abjasdfh3w45765uafjakdscdsv"

async function createTokenForUser(user) {
    return jwt.sign({
        id: user._id,
        email: user.email,
        fullName: user.fullName,
    },
        secret
    )
}

async function validateToken(token) {
    if (!token) return null;
    return jwt.verify(token, secret)
}

module.exports = { createTokenForUser, validateToken }