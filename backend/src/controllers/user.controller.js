const { userModel } = require('../models/user.model');
const { compare } = require('bcryptjs');
const { transporter } = require('../utils/mailer');
const { newUserOptions, resetPasswordOptions } = require('../utils/emailOptions');
const { generateToken } = require('../utils/generateToken');
const crypto = require('crypto');
const { getPayload } = require('../utils/getPayload');
const { ADMIN_URL, USER_INT_URL, USER_EXT_URL } = require('../config');
const { deleteImage } = require('../utils/cloudinary');
const { uploadAvatar, deleteAvatar } = require('./avatar.controller');

// Iniciar sesión:
exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email }) // Buscar usuario en la DB
        if (!user) {
            return res.send({ estado: "error", msg: "Credenciales NO válidas. Intentelo de nuevo!!!" });
        }
        const passOK = await compare(password, user.password) // Validar contraseña
        if (passOK) {
            const token = generateToken(user); // Generar token de autenticación
            if (user.rol === 3) { // Validar si es usuario externo
                return res.status(200).send({ estado: "ok", msg: "Logueado con éxito!!!", token, url: USER_EXT_URL });
            } else if (user.rol === 2) { // Validar si es usuario interno
                return res.status(200).send({ estado: "ok", msg: "Logueado con éxito!!!", token, url: USER_INT_URL });
            } else if (user.rol === 1) { // Validar si es administrador
                return res.status(200).send({ estado: "ok", msg: "Logueado con éxito!!!", token, url: ADMIN_URL });
            }
        } else {
            return res.send({ estado: "error", msg: "Credenciales NO válidas. Intentelo de nuevo!!!" });
        }
    } catch (error) {
        console.log("Error iniciando sesión: " + error)
    }
}

// Listar usuarios:
exports.getUsers = async (req, res) => {
    try {
        const users = await userModel.find({ estado: 1 }) // Buscar en la DB usuarios con "estado" igual a 1 (Activo)
        if (users !== null) {
            return res.status(200).send({ estado: "ok", msg: "Usuarios visualizados!!!", users });
        } else {
            return res.send({ estado: "error", msg: "ERROR: Usuarios NO encontrados!!!" });
        }
    } catch (error) {
        console.log(error)
    }
}

// Guardar usuario:
exports.createUser = async (req, res) => {
    try {
        const user = await new userModel(req.body)
        user.avatar = "" // Valor por defecto de "avatar"
        const { nro_doc, email, nombres, password } = req.body
        if (req.files?.imagen) { // Subir avatar de usuario - Validar si hay un archivo en el req
            const result = await uploadAvatar(req, user) // Subir imágen a Cloudinary
            user.setAvatar({ public_id: result.public_id, secure_url: result.secure_url }) // Setear "avatar" del nuevo usuario
        }
        const existingUser = await userModel.findOne({ $or: [{ nro_doc }, { email }] }) // Buscar en la DB usuario existente con el mismo "nro_doc" o "email" del req
        if (!existingUser) { // Si no hay usuario existente
            await user.save()// Guardar nuevo usuario
            if (user.rol === 2) { // Si es un usuario interno (2)
                try {
                    transporter.sendMail(newUserOptions(email, nombres, password)) // Enviar email con credenciales
                } catch (error) {
                    console.log("Error enviando email: " + error)
                }
                return res.status(200).send({ estado: "ok", msg: "El usuario fue creado exitosamente!!!", user });
            } else { // Si es usuario externo (3)
                return res.status(200).send({ estado: "ok", msg: "Su cuenta fue creada exitosamente. Ya puede iniciar sesión!!!", user });
            }
        } else { // Si hay un usuario existente
            if (user.rol === 2) {
                return res.send({ estado: "error", msg: "ERROR: Ya existe un Usuario inactivo con ese Número de Documento o Email, en la Base de Datos!!!" });
            }
            return res.send({ estado: "error", msg: "ERROR: Ya existe una cuenta con ese Número de Documento o Email. Para más información, comuníquese con el área de soporte!!!" });
        }
    } catch (error) {
        console.log("Error creando usuario: " + error)
        return res.send({ estado: "error", msg: "ERROR: El usuario no pudo ser creado!!!" });
    }
}

// Editar usuario:
exports.updateUser = async (req, res) => {
    try {
        const data = req.body
        const { nro_doc } = req.body
        const foundUser = await userModel.findOne({ nro_doc }) // Buscar en la DB usuario a editar
        if (req.files?.imagen) { // Editar avatar de usuario - Validar si hay un archivo en el req
            const result = await uploadAvatar(req, foundUser) // Subir nueva imágen a Cloudinary
            data.avatar = { public_id: result.public_id, secure_url: result.secure_url } // Setear nuevo "avatar" al usuario
        } else { // Eliminar avatar de usuario
            data.avatar = await deleteAvatar(data, foundUser)
        }
        await userModel.updateOne({ nro_doc }, { $set: data }) // Actualizar usuario
        const user = await userModel.findOne({ nro_doc }) // Buscar en la DB usuario actualizado, para enviarlo al Frontend
        return res.status(200).send({ estado: "ok", msg: "El usuario fue editado exitosamente!!!", user });
    } catch (error) {
        console.log("Error editando usuario: " + error)
        return res.send({ estado: "error", msg: "ERROR: El usuario no pudo ser editado!!!" });
    }
}

// Actualizar campos de Actividad de Predios en usuario:
exports.updateUserPredioFields = (user) => {
    try {
        user.updateOne({
            $set: {
                created_predios: user.created_predios,
                edited_predios: user.edited_predios,
                deleted_predios: user.deleted_predios
            }
        }, (error) => {
            if (error) console.log("Error actualizando campos de Actividad de Predios: " + error)
        })
        return user;
    } catch (error) {
        console.log(error)
    }
}

// Eliminar usuario:
exports.deleteUser = async (req, res) => {
    try {
        const nro_doc = req.params.nro_doc
        const user = await userModel.findOne({ nro_doc }) // Buscar en la DB usuario a eliminar
        if (user.avatar.public_id) { // Validar si el usuario tiene "avatar"
            await deleteImage(user.avatar.public_id) // Eliminar imágen de Cloudinary
        }
        // Setear "estado" como null para no mostrar el usuario en el Frontend, pero mantenerlo en la DB. También setear "avatar" con cadenas vacías
        await userModel.updateOne({ nro_doc }, { $set: { estado: null, avatar: "" } }) // Actualizar estado y avatar del usuario
        return res.status(200).send({ estado: "ok", msg: "El usuario fue eliminado exitosamente!!!" });
    } catch (error) {
        console.log("Error eliminando usuario: " + error)
        return res.send({ estado: "error", msg: "ERROR: El usuario no pudo ser eliminado!!!" });
    }
}

// Cambiar contraseña:
exports.changePassword = async (req, res) => {
    console.log(req.body)
    try {
        const { currentPassword, newPassword } = req.body
        const { nro_doc } = getPayload(req.headers.authorization)
        const user = await userModel.findOne({ nro_doc }) // Buscar en la DB usuario a actualizar
        const passOK = await compare(currentPassword, user.password) // Validar password actual
        if (passOK) {
            const newPassOK = await compare(newPassword, user.password) // Validar que el nuevo password no sea igual al actual
            if (!newPassOK) {
                user.password = newPassword // Setear nuevo password
                await user.save() // Guardar cambios
                return res.status(200).send({ estado: "ok", msg: "Contraseña actualizada con éxito. Por favor, inicie sesión nuevamente!!!" });
            } else {
                return res.send({ estado: "error", msg: "ERROR: Por favor ingrese una contraseña que no haya utilizado antes!!!" });
            }
        } else {
            return res.send({ estado: "error", msg: "ERROR: Ingrese correctamente su contraseña actual!!!" });
        }
    } catch (error) {
        console.log("Error cambiando contraseña: " + error)
        return res.send({ estado: "error", msg: "ERROR: No se pudo actualizar la contraseña!!!" });
    }
}

// Solicitar one-time-link para restablecer contraseña:
exports.getResetLink = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email: email }) // Buscar usuario en la DB, con "email" del req
        if (!user) {
            return res.send({ estado: "error", msg: "Por favor, revise que el correo ingresado sea el mismo con el que se registró!!!" })
        }
        const resetToken = crypto.randomBytes(32).toString('hex') // Generar token
        user.reset_token = resetToken // Setear "reset_token" con el token generado
        user.expire_token = Date.now() + 3600000 // Setear hora de expiración del "reset_token" (Hora actual + 1h)
        await user.save() // Guardar cambios
        const { nombres, reset_token } = user
        transporter.sendMail(resetPasswordOptions(email, nombres, reset_token)) // Enviar one-time-link al "email" del usuario
        return res.status(200).json({ estado: "ok", msg: "Por favor, revise su correo!!!" })
    } catch (error) {
        console.log("Error enviando one-time-link: " + error)
        res.send({ estado: "error", msg: "ERROR: Ocurrió un error al enviar el link. Por favor, intentelo de nuevo!!!" });
    }
}

// Configurar nueva contraseña por medio del one-time-link:
exports.setNewPassword = async (req, res) => {
    try {
        const { newPassword, resetToken } = req.body
        const user = await userModel.findOne({ reset_token: resetToken, expire_token: { $gt: Date.now() } }) // Validar "reset_token"
        if (!user) {
            return res.json({ msg: "El link que está utilizando para restablecer su contraseña caducó. Por favor, solicite uno nuevo!!!" })
        }
        user.password = newPassword // Setear nuevo password
        user.reset_token = undefined // Setear "reset token" como undefined
        user.expire_token = undefined // Setear "expire token" como undefined
        await user.save() // Guardar cambios
        res.status(200).send({ estado: "ok", msg: "Contraseña restablecida con éxito. Por favor, inicie sesión!!!" })
    } catch (error) {
        console.log("Error restableciendo contraseña: " + error)
        res.send({ estado: "error", msg: "ERROR: No se pudo actualizar la contraseña" });
    }
}
