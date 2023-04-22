//https://api.thedogapi.com/v1/breeds?api_key=live_VeT7Mtm1gH9ai3BitHdzZBiyuHozqNG6ZfE1ltpsmKThC4Z5zTWrFYvOavKXTCYO

const axios = require('axios');
const { Dog, Temperament } = require('../db');

const getApiData = async () => {
  const dogsApiUrl = await axios.get(
    'https://api.thedogapi.com/v1/breeds?api_key=live_VeT7Mtm1gH9ai3BitHdzZBiyuHozqNG6ZfE1ltpsmKThC4Z5zTWrFYvOavKXTCYOs'
  );

  //Recogemos la data del API.

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
  return dogsData;
};

//Recogemos la data de la DB.

const getDbData = async () => {
  let dogDb = await Dog.findAll({
    include: {
      model: Temperament,
      atributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });
  mappedDog = dogDb.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      weight_minimun: dog.minimun_weight,
      weight_maximun: dog.maximun_weight,
      lifespan: dog.lifespan,
      image: dog.image,
      db: dog.db,
      height: `${dog.height_min} - ${dog.height_max}`,
      temperament: dog.temperaments
        .map((e) => {
          return e.name;
        })
        .join(','),
    };
  });
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
