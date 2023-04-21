const { Router } = require('express');
const { getAllData } = require('../controller/getAllData');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Dog, Temperament } = require('../db');
const router = Router();
const axios = require('axios');
const { Sequelize, Model } = require('sequelize');
const e = require('express');

module.exports = router;
