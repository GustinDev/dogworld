import axios from 'axios';
import {
  GET_ALL_DOGS,
  GET_ALL_TEMPERAMENTS,
  GET_DOG_NAME,
  GET_DOG_DETAIL,
  FILTER_BY_TEMPERAMENTS,
  FILTER_BY_NAME,
  FILTER_BY_WEIGHT,
  FILTER_BY_HEIGHT,
  FILTER_CREATED_DOG,
  //POST_DOG,
  CLEAR_DETAIL,
} from '../action-types/action-types';

//Actions: Son objetos que contienen data (payload) y dicen que operación ejecutar (type) sobre el Store. Si queremos actualizar, borrar, filtrar o añadir datos.

//Tiene 2 datos, debemos hacer el dispatch:

//type: Son "Ordenes - Pedidos" de lo queremos hacer, son tomadas por el reducer para ser ejecutadas.
//payload: Data que pasaremos al Store para actualizar el estado. Data del Backend (info JSON recibida del backend) y Data del Frontend (que pasan por param llamando las funciones) como (name, id) e intrucciones ("A-Z", "created").

//RECIBIR DATA:
//BACKEND: Por URL recibimos data JSON.
//FRONTEND: Allá llaman a las funciones de actions, les pasan por parámetro las cosas. Ejemplo: filterByName("A-Z")

//ACTIONS: AQUI SE JUNTA EL FRONT CON EL BACK.

//* DOGS DATA

//Tomamos la data de todos los dogs de /dogs y la despachamos.
export function getAllDogs() {
  return async function (dispatch) {
    var json = await axios.get('http://localhost:3001/dogs');
    return dispatch({
      type: GET_ALL_DOGS,
      payload: json.data,
    });
  };
}

//Recibimos el ID (front), lo sumamos a la URL, adquirimos la data de /Id (back) y la despachamos.

export function getDog(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/dogs/${id}`);
      return dispatch({
        type: GET_DOG_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//Recibimos el name (front). Lo sumamos a la URL, adquirimos la data de /dog?name= (back) y la despachamos.

export function getDogName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/dogs?name=${name}`);
      return dispatch({
        type: GET_DOG_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.log('Dog cannot be found.');
    }
  };
}

//Recibimos la data por body (front), se la pasamos a /dogs - POST (back) junto con la data.

export function postDog(data) {
  return async function () {
    const posted = await axios.post('http://localhost:3001/dogs', data);
    return posted;
  };
}

export function clearDetail() {
  return {
    type: CLEAR_DETAIL,
  };
}

//* FILTER DOGS

//Damos la "orden" filtrar los dogs por nombre. Recibimos "A-Z" (front) y lo enviamos para que sean filtrados alfabeticamente.

export function filterByName(payload) {
  return {
    type: FILTER_BY_NAME,
    payload,
  };
}

//Damos la "orden" filtrar los dogs por peso. Recibimos "min_weight" (del front), lo envíamos en payload si queremos filtrar de menor a mayor.

export function filterByWeight(payload) {
  return {
    type: FILTER_BY_WEIGHT,
    payload,
  };
}

//Damos la "orden" filtrar los dogs por altura. Recibimos "short" o "tall" (del front), lo envíamos en payload si queremos filtrar de menor a mayor.
export function filterByHeight(payload) {
  return {
    type: FILTER_BY_HEIGHT,
    payload,
  };
}

//Damos la "orden" filtrar los dogs creados en DB by User. Recibimos "created" (front) para ver los que son de la DB o "all" para ver todos, lo pasamos en payload.

export function filterCreatedDog(payload) {
  return {
    type: FILTER_CREATED_DOG,
    payload,
  };
}

//*TEMPERAMENTS

//Tomamos la data de todos los temperaments de /temperaments y la despachamos.

export function getTemperaments() {
  return async function (dispatch) {
    var json = await axios.get('http://localhost:3001/temperaments');
    return dispatch({
      type: GET_ALL_TEMPERAMENTS,
      payload: json.data,
    });
  };
}

//Damos la "orden" filtrar los dogs por Temperament. Recibimos el Temperament por el que queremos filtrar (por front), o "All" si queremos todos. Lo pasamos por payload.

export function FilterByTemperament(payload) {
  return {
    type: FILTER_BY_TEMPERAMENTS,
    payload,
  };
}
