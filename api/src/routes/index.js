const { Router } = require('express');
const { getAllData } = require('../controller/getAllData');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const dog = require('./dogs');
const temperament = require('./temperament');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//DEFINIMOS LAS RUTAS (para cada table).
//Cada que algo llegue a la ruta raiz "/" le indicamos que puede ser manejado por esos routes.
router.use('/', dog);
router.use('/', temperament);

module.exports = router;
