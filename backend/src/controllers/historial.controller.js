const { historialModel } = require('../models/historial.model');

// Listar historial de actividad de predios:
exports.getHistorial = async (req, res) => {
    try {
        const historial = await historialModel.find({}) // Buscar historiales en la DB
        if (historial !== null) {
            return res.send({ estado: "ok", msg: "Historial visualizado!!!", historial });
        } else {
            return res.send({ estado: "error", msg: "ERROR: Historial NO encontrado!!!" });
        }
    } catch (error) {
        console.log(error)
    }
}

// Crear historial de actividad de predios:
exports.createHistorial = (user, action, codigo) => {
    try {
        const historial = new historialModel() // Crear nuevo historial
        historial.author = user.nombres
        historial.action = action
        historial.fecha = Date.now()
        historial.code = codigo
        historial.save() // Guardar historial
        return historial;
    } catch (error) {
        console.log("Error guardando historial: " + error)
    }
}
