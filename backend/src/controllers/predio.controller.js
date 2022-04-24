const { predioModel } = require('../models/predio.model');
const { userModel } = require('../models/user.model');
const { transporter } = require('../utils/mailer');
const { newPredioOptions } = require('../utils/emailOptions');
const { createHistorial } = require('./historial.controller');
const { getPayload } = require('../utils/getPayload');
const { updateUserPredioFields } = require('./user.controller');

// Listar predios:
exports.getPredios = async (req, res) => {
    try {
        const predios = await predioModel.find({ estado: 1 }) // Buscar en la DB predios con "estado" igual a 1 (Activo)
        if (predios !== null) {
            return res.status(200).send({ estado: "ok", msg: "Predios visualizados!!!", predios });
        } else {
            return res.send({ estado: "error", msg: "ERROR: Predios NO encontrados!!!" });
        }
    } catch (error) {
        console.log(error)
    }
}

// Guardar predios:
exports.createPredio = async (req, res) => {
    try {
        const predio = await new predioModel(req.body)
        const { email_prop, nom_prop, codigo, doc_prop, direccion_predio } = req.body
        const { nro_doc } = getPayload(req.headers.authorization) // Extraer nro de documento del usuario que está creando el predio
        const existingPredio = await predioModel.findOne({ $or: [{ codigo }, { direccion_predio }] }) // Buscar en la DB predio existente con el mismo "codigo" o "direccion_predio" del req
        if (!existingPredio) {
            await predio.save() // Guardar nuevo predio
            transporter.sendMail(newPredioOptions(email_prop, nom_prop, codigo, doc_prop)) // Enviar email al propietario del predio
            const loggedUser = await userModel.findOne({ nro_doc }) // Buscar usuario que creó el predio
            loggedUser.created_predios += 1 // Aumentar en 1 el campo "created_predios"
            const user = updateUserPredioFields(loggedUser) // Actualizar campo "created_predios"
            const historial = createHistorial(loggedUser, "creó", codigo) // Crear historial
            return res.status(200).send({ estado: "ok", msg: "El predio fue creado exitosamente!!!", predio, user, historial });
        } else {
            return res.send({ estado: "error", msg: "ERROR: Ya existe un Predio inactivo con ese Código o Dirección, en la Base de Datos!!!" });
        }
    } catch (error) {
        console.log("Error creando predio: " + error)
        return res.send({ estado: "error", msg: "ERROR: El predio no pudo ser creado!!!" });
    }
}

// Editar predios:
exports.updatePredio = async (req, res) => {
    try {
        const { codigo } = req.body
        const { nro_doc } = getPayload(req.headers.authorization) // Extraer nro de documento del usuario que está editando el predio  
        await predioModel.updateOne({ codigo }, { $set: req.body }) // Actualizar predio
        const loggedUser = await userModel.findOne({ nro_doc }) // Buscar usuario que editó el predio
        loggedUser.edited_predios += 1 // Aumentar en 1 el campo "edited_predios"
        const user = updateUserPredioFields(loggedUser) // Actualizar campo "edited_predios"
        const historial = createHistorial(loggedUser, "editó", codigo) // Crear historial
        return res.status(200).send({ estado: "ok", msg: "El predio fue editado exitosamente!!!", user, historial });
    } catch (error) {
        console.log("Error editando predio: " + error)
        return res.send({ estado: "error", msg: "ERROR: El predio no pudo ser editado!!!" });
    }
}

// Eliminar predios:
exports.deletePredio = async (req, res) => {
    try {
        const codigo = req.params.codigo
        const { nro_doc } = getPayload(req.headers.authorization) // Extraer nro de documento del usuario que está eliminando el predio 
        // Setear "estado" como null para no mostrar el predio en el Frontend, pero mantenerlo en la DB
        await predioModel.updateOne({ codigo }, { $set: { estado: null } }) // Actualizar estado del predio
        const loggedUser = await userModel.findOne({ nro_doc }) // // Buscar usuario que eliminó el predio
        loggedUser.deleted_predios += 1 // Aumentar en 1 el campo "deleted_predios"
        const user = updateUserPredioFields(loggedUser) // Actualizar campo "deleted_predios"
        const historial = createHistorial(loggedUser, "eliminó", codigo) // Crear historial
        return res.status(200).send({ estado: "ok", msg: "El predio fue eliminado exitosamente!!!", user, historial });
    } catch (error) {
        console.log("Error eliminando predio: " + error)
        return res.send({ estado: "error", msg: "ERROR: El predio no pudo ser eliminado!!!" });
    }
}

// Consultar predios por Documento del Propietario:
exports.findPrediosByDoc = async (req, res) => {
    try {
        const doc_prop = req.params.doc_prop
        const predios = await predioModel.find({ doc_prop }) // Buscar predios en la DB
        if (predios !== null) {
            return res.send({ estado: "ok", msg: "Predios Encontrados", data: predios });
        } else {
            return res.send({ estado: "error", msg: "Predios NO encontrados", data: [] });
        }
    } catch (error) {
        console.log("Error consultando predios: " + error)
        return res.send({ estado: "error", msg: "Predios NO encontrados", data: [] });
    }
}

// Consultar predio pór Código del Predio:
exports.findPredioByCode = async (req, res) => {
    try {
        const codigo = req.params.codigo
        const predio = await predioModel.findOne({ codigo }) // Buscar predio en la DB
        if (predio !== null) {
            return res.send({ estado: "ok", msg: "Predio Encontrado", data: predio });
        } else {
            return res.send({ estado: "error", msg: "Predio NO encontrado", data: {} });
        }
    } catch (error) {
        console.log("Error consultando predio: " + error)
        return res.send({ estado: "error", msg: "Predio NO encontrado", data: {} });
    }
}
