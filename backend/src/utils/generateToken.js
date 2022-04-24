const { sign } = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config');

exports.generateToken = (user) => {
    const token = sign(
        {
            nro_doc: user.nro_doc,
            usuario: user.email,
            rol: user.rol,
        },
        JWT_SECRET_KEY,
        { expiresIn: '6h' }
    )
    return token
}
