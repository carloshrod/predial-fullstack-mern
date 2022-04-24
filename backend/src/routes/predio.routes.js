const { Router } = require('express');
const {
    getPredios, createPredio, updatePredio,
    deletePredio, findPrediosByDoc, findPredioByCode
} = require('../controllers/predio.controller');
const { getHistorial } = require('../controllers/historial.controller');
const { authPredios } = require('../middlewares/authPredios');

const predioRoutes = Router()

predioRoutes.get("/listar", getPredios) // Listar predios
predioRoutes.get("/historial", getHistorial) // Listar historial
predioRoutes.post("/guardar", authPredios, createPredio) // Guardar predio
predioRoutes.post("/editar", authPredios, updatePredio) //Editar predio
predioRoutes.post("/eliminar/:codigo", authPredios, deletePredio) // Eliminar predio
predioRoutes.get("/consultar/:doc_prop", findPrediosByDoc) // Consultar predios por nro de documento del propietario
predioRoutes.get("/consultar-uno/:codigo", findPredioByCode) // Consultar un predio por código

exports.predioRoutes = predioRoutes;