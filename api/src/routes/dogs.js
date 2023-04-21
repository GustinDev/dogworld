const { Router } = require('express');
const axios = require('axios');
const e = require('express');
const router = Router();

//Data & Models
const { getAllData } = require('../controller/getAllData');
const { Dog, Temperament } = require('../db');
//Models
const { Sequelize, Model } = require('sequelize');

//GET ALL DOGs

router.get('/dogs', async (req, res) => {
  //Comprobamos si hay name - query.
  const name = req.query.name;
  //Reunimos TODA la data.
  const allDogs = await getAllData();
  //Si hay name, lo pasamos a minus, filtamos la data y retornamos.
  try {
    if (name) {
      //Filtramos la data, esperando que el name (params en minus) sea igual a name (data en minus).
      const dogId = allDogs.filter((dog) =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      );
      if (dogId.length) {
        return res.status(200).send(dogId);
      } else {
        return res.status(404).send({ error: error });
      }
    } else {
      //Si no, enviamos todos.
      return res.status(201).json(allDogs);
    }
  } catch (error) {
    res.status(404).send({ error: error });
  }
});

//GET ID

router.get('/dogs/:idRaza', async (req, res) => {
  //Sacamos el ID de params.
  const { idRaza } = req.params;
  //Reunimos TODA la data.
  const allDogs = await getAllData();
  //Filtramos la data, esperando que el ID sea igual IDRaza.
  try {
    const dogId = allDogs.filter((dog) => dog.id == idRaza);
    return res.status(200).send(dogId);
  } catch (error) {
    return res.status(404).send({ error: error });
  }
});

module.exports = router;
