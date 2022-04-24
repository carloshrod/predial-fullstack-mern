const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const predioSchema = new Schema({
    codigo: {
        type: String,
        required: true,
        unique: true
    },
    nom_prop: {
        type: String,
        required: true
    },
    doc_prop: {
        type: Number,
        required: true
    },
    email_prop: {
        type: String,
        required: true
    },
    area_c: {
        type: String,
        required: true
    },
    area_t: {
        type: String,
        required: true
    },
    direccion_predio: {
        type: String,
        required: true,
        unique: true
    },
    barrio: {
        type: String,
        required: true
    },
    fecha_pago: {
        type: String
    },
    fecha_pago2: {
        type: String
    },
    fecha_pago3: {
        type: String
    },
    valor_predio: {
        type: String,
        required: true
    },
    valor_predial: {
        type: String
    },
    estado: {
        type: Number,
        required: true
    }
})

exports.predioModel = mongoose.model("predios", predioSchema);
