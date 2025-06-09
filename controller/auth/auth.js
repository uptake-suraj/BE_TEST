const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
    const token = jwt.sign({ userName: user.userName }, "abcd", { expiresIn: "15min" })
    return token;
};

const generateRefreshToken = (user) => {
    const token = jwt.sign({ userName: user.userName }, "cdef", { expiresIn: "7d" })
    return token;
};

module.exports = {
    generateAccessToken,
    generateRefreshToken
}