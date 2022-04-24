const { verify } = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config");

exports.getPayload = (auth) => {
    const token = auth.split(' ')[1]
    const payload = verify(token, JWT_SECRET_KEY)
    return payload
}
