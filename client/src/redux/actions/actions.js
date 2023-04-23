import axios from 'axios';
import {
  GET_ALL_DOGS,
  GET_ALL_TEMPERAMENTS,
  GET_DOG_NAME,
  GET_DOG_DETAIL,
  FILTER_BY_NAME,
  FILTER_BY_WEIGHT,
  FILTER_BY_TEMPERAMENTS,
  FILTER_CREATED_DOG,
  //POST_DOG,
  CLEAR_DETAIL,
  //DELETE_DOG,
} from '../action-types/action-types';

//Redux: Son objetos que contienen información (1. payload) y le dicen que operación ejecutar (2. type) sobre el Store. Si queremos actualizar, borrar, filtrar o añadir datos.

//Tiene 2 datos, debemos hacer el dispatch:

//type: Descripciones - nombres, de lo queremos hacer. Son "Ordenes - Pedidos" que son tomadas por el reducer para ser ejecutadas.
//payload: Data que pasaremos al Store para actualizar el estado (tambien pueden ser name o continents para filtrar).

//ACTIONS: AQUI SE JUNTA EL FRONT CON EL BACK.

// DOGS
//Tomamos la data de todos los dogs de GET_ALL.
export function getAllDogs() {
  return async function (dispatch) {
    var json = await axios.get('/dogs');
    return dispatch({
      type: GET_ALL_DOGS,
      payload: json.data,
    });
  };
}

//Recibimos el ID, lo sumamos a la URL, adquirimos la data de GET ID y la despachamos.

export function getDog(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/dogs/${id}`);
      return dispatch({
        type: GET_DOG_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//Recibimos el name, lo sumamos a la URL, adquirimos la data de GET?NAME y la despachamos.

export function getDogName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/dogs?name=${name}`);
      return dispatch({
        type: GET_DOG_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.log('Dog cannot be found.');
    }
  };
}

//Recibimos la data por body, se la pasamos a /POST junto con la data.

export function postDog(data) {
  return async function () {
    const posted = await axios.post('/dogs', data);
    return posted;
  };
}

//Damos la "orden" filtrar los dogs por altura, pasamos ---.
export function filterByHeight(payload) {
  return {
    type: 'FILTER_BY_HEIGHT',
    payload,
  };
}

//Damos la "orden" filtrar los dogs por nombre, pasamos A-Z para que sean filtrados alfabeticamente.

export function filterByName(payload) {
  return {
    type: FILTER_BY_NAME,
    payload,
  };
}

//Damos la "orden" filtrar los dogs por nombre, pasamos "min_weight" en el payload si queremos de menor a mayor.

export function filterByWeight(payload) {
  return {
    type: FILTER_BY_WEIGHT,
    payload,
  };
}

//Damos la "orden" filtrar los dogs, traemos los que son creado por el user, pasamos "created" para ver los que son de la DB o "all" para ver todos.

export function filterCreatedDog(payload) {
  return {
    type: FILTER_CREATED_DOG,
    payload,
  };
}

//TEMPERAMENTS

//Tomamos la data de todos los temp de GET_ALL TEMP.
export function getTemperaments() {
  return async function (dispatch) {
    var json = await axios.get('/temperaments');
    return dispatch({
      type: GET_ALL_TEMPERAMENTS,
      payload: json.data,
    });
  };
}

//Damos la "orden" filtrar los dogs por Temperament, pasamos el Temperament por el que queremos filtrar, o "All" si queremos todos.

export function FilterByTemperament(payload) {
  return {
    type: FILTER_BY_TEMPERAMENTS,
    payload,
  };
}

//STANDARD

//Damos la "orden" quitar los detalles.

export function clearDetail() {
  return {
    type: CLEAR_DETAIL,
  };
}

//DELETE DOG (CREAR)
