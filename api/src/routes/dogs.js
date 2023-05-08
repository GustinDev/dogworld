//Standard Imports
const { Router } = require('express');
const axios = require('axios');
const router = Router();

//API KEY
require('dotenv').config();
const { API_KEY } = process.env;

//Data & Models
const { getAllData } = require('../controller/getAllData');
const { Dog, Temperament } = require('../db');
//const { Sequelize, Model } = require('sequelize');

//*ROUTES:

//GET ALL DOGs - GET QUERY ?NAME=
//http://localhost:3001/dogs - http://localhost:3001/dogs?name=la

router.get('/dogs', async (req, res) => {
  //Comprobamos si hay name - query.
  const name = req.query.name;
  //Reunimos TODA la data.
  const allDogs = await getAllData();
  //Si hay name, lo pasamos a minus, filtamos la data y retornamos.
  try {
    if (name) {
      //Filtramos la data, esperando que el name (de params en minus) sea igual a name (data en minus).
      const dogName = allDogs.filter((dog) =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      );
      if (dogName.length) {
        return res.status(200).send(dogName);
      } else {
        return res.status(404).send({ error: error });
      }
    } else {
      //Si no hay name, enviamos todos los perros.
      return res.status(201).json(allDogs);
    }
  } catch (error) {
    res.status(404).send({ error: error });
  }
});

//GET ID
//http://localhost:3001/dogs/11

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

//GET ALL - Temperaments (Guardamos los Temp en la DB).
//http://localhost:3001/temperaments

router.get('/temperaments', async (req, res) => {
  try {
    //Traemos TODA la data del api.
    const api = await axios.get(
      'https://api.thedogapi.com/v1/breeds?api_key=' + API_KEY
    );
    //Sacamos los temperament de casa objeto.
    //Quedan: "Curious, Playful", "Independent, Happy"
    const temperament = await api.data.map((dog) => dog.temperament);
    //Unimos todos los temperament en un array, los dividimos ",":
    //Quedan: ["Curious", " Playful","Independent", " Happy"]
    let temperamentSplit = await temperament.join().split(',');
    //Le quitamos los espacios que quedaron.
    //Quedan: ["Curious", "Playful","Independent", "Happy"]
    let temperamentFinal = await temperamentSplit.map((s) => s.trim());
    //Ya tenemos el array final. Ahora, los guardamos en la tabla Temperaments:
    await temperamentFinal.forEach(async (temperament) => {
      //temperament.length > 0
      if (temperament.length > 0) {
        await Temperament.findOrCreate({
          where: { name: temperament },
        });
      }
    });
    // Traemos a todos los temperament y los enviamos.
    const allTemperament = await Temperament.findAll();
    return res.status(200).json(allTemperament);
  } catch (error) {
    res.status(404).send({ error: 'No temperaments were found.' });
  }
});

//POST - Dogs (Tabla Temperament tiene que estar llena).
//http://localhost:3001/dogs (Le ponemos post y mandamos data por JSON)

router.post('/dogs', async (req, res) => {
  // Pasamos los datos del dog por body.
  let {
    name,
    minimun_height,
    maximun_height,
    minimun_weight,
    maximun_weight,
    lifespan,
    db,
    temperament,
  } = req.body;

  //Comprobamos en la DB Dogs si hay alguno con el mismo name.
  const dogInDb = await Dog.findOne({
    where: { name: name },
  });
  if (dogInDb) {
    //Si si, le decimos que ya existe.
    return res.status(404).send('The new doggy already exist.');
  } else {
    //Si no, lo creamos (no pasamos el temperament).
    let NewDog = await Dog.create({
      name,
      minimun_height,
      maximun_height,
      minimun_weight,
      maximun_weight,
      lifespan,
      db,
    });
    //Busca en la tabla de Temperament (llenada anteriormente), el temperament pasado por body.
    let temperamentInDB = await Temperament.findAll({
      where: { name: temperament },
    });
    //Los relacionamos. Le añadimos al perro el temperamento.
    //En la tabla de DogTemperament, ahora hay linea que relaciona al ID del Dog y al de Temperament.
    NewDog.addTemperament(temperamentInDB);
    return res.status(200).send('The new doggy was created successfully.');
  }
});

module.exports = router;
