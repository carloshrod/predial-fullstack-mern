const { Router } = require('express');
const {
    Login, getUsers, createUser, updateUser,
    deleteUser, changePassword, getResetLink, setNewPassword
} = require('../controllers/user.controller');
const { authUser } = require('../middlewares/authUser');
const { Upload } = require('../middlewares/fileUpload');

const userRoutes = Router()

userRoutes.post("/login", Login) // Inicio de sesión
userRoutes.get("/listar", getUsers) // Listar usuarios
userRoutes.post("/guardar", authUser, Upload, createUser) // Crear usuario interno
userRoutes.post("/registro", createUser) // Crear usuario externo
userRoutes.post("/editar/:nro_doc", authUser, Upload, updateUser) // Editar usuario
userRoutes.delete("/eliminar/:nro_doc", authUser, Upload, deleteUser) // Eliminar usuario
userRoutes.post("/cambiar-password", changePassword) // Cambiar contraseña
userRoutes.post("/reset-password", getResetLink) // Solicitar restablecer contraseña
userRoutes.post("/new-password", setNewPassword) // Restablecer contraseña

exports.userRoutes = userRoutes;
