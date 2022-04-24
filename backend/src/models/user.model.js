const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { genSalt, hash } = require('bcryptjs');

const userSchema = new Schema({
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    tipo_doc: {
        type: String,
        required: true
    },
    nro_doc: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    rol: {
        type: Number,
        required: true
    },
    estado: {
        type: Number,
        required: true
    },
    avatar: {
        public_id: String,
        secure_url: String,
    },
    created_predios: {
        type: Number,
        default: null
    },
    edited_predios: {
        type: Number,
        default: null
    },
    deleted_predios: {
        type: Number,
        default: null
    },
    reset_token: {
        type: String
    },
    expire_token: {
        type: Date
    },
})

// Método para setear valores del campo "avatar"
userSchema.methods.setAvatar = function setAvatar(result) {
    this.avatar = result
}

// Preguardado de contraseña
userSchema.pre("save", async function (next) {
    const salt = await genSalt(10); // Generar salt de 10
    this.password = await hash(this.password, salt); // Hashear password
    next();
})

exports.userModel = mongoose.model("users", userSchema);
