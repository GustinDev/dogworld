//API KEY
require('dotenv').config();
const { API_KEY } = process.env;
//Axios
const axios = require('axios');
//Importamos las tablas:
const { Dog, Temperament } = require('../db');

//API.
const getApiData = async () => {
  //Traemos la data con axios.
  const dogsApiUrl = await axios.get(
    'https://api.thedogapi.com/v1/breeds?api_key=' + API_KEY
  );
  //Mapeamos la data, por cada dog retorna lo que queremos (igual que la DB).
  let dogsData = await dogsApiUrl.data.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      temperament: dog.temperament,
      weight_minimun: parseInt(dog.weight.metric.split('-')[0]),
      weight_maximun: parseInt(dog.weight.metric.split('-')[1]),
      height: dog.height.metric,
      lifespan: dog.life_span,
      image: dog.image.url,
    };
  });
  //Retornamos la data limpia.
  return dogsData;
};

//DB.

const getDbData = async () => {
  //Le pedimos que nos traigo todo de la tabla Dog (junto con la relación con Temp).
  let dogDb = await Dog.findAll({
    include: {
      model: Temperament,
      atributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });
  //Mapeamos la data para organizarla como queremos (igual que la API).
  mappedDog = dogDb.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      weight_minimun: dog.minimun_weight,
      weight_maximun: dog.maximun_weight,
      lifespan: dog.lifespan,
      image: dog.image,
      db: dog.db,
      height: `${dog.maximun_height} - ${dog.minimun_height}`,
      temperament: dog.temperaments
        .map((e) => {
          return e.name;
        })
        .join(','),
    };
  });
  //Retornamos la data limpia.
  return mappedDog;
};

//Unimos la data y la retornamos.

const getAllData = async () => {
  let apiData = await getApiData();
  let dbData = await getDbData();
  let allData = apiData.concat(dbData);
  return allData;
};

module.exports = { getAllData };
