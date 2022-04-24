const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectToDB } = require('./utils/mongoose');
const { router } = require('./routes/index.routes');
const path = require('path');
require("dotenv").config();

const app = express();

//Middlewares:
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router:
app.use(router);

// Conección a Base de Datos:
connectToDB();

// Configuraciones para desplegar app:
const PORT = process.env.PORT || 8080;

__dirname = path.resolve();
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
} else {
    router.get('/', (req, res) => {
        res.send("Plataforma de Gestión Catastral - Backend");
    });
};

// Iniciar servidor:
app.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}!!!`);
});
