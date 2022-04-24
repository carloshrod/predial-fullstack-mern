const { verify } = require('jsonwebtoken');

exports.authUser = (req, res, next) => {
    try {
        const nro_doc = req.params.nro_doc // Capturar el nro de documento del usuario a editar
        const authorization = req.headers.authorization
        if (!authorization) { // Validar si hay token
            return res.send({ estado: "error", msg: "NO AUTORIZADO" })
        }
        const token = authorization.split(' ')[1] // Capturar el token
        const payload = verify(token, process.env.JWT_SECRET_KEY) // Obtener carga útil
        if (payload.rol !== 1 && payload.nro_doc !== parseInt(nro_doc)) { // Verificar rol del usuario y si va a editar su propio perfil
            return res.send({ estado: "error", msg: "No estás autorizado para realizar esta acción!!!" });
        }
    } catch (error) {
        console.log(error)
    }
    return next();
}
