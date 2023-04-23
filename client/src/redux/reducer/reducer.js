//Importamos las acciones:

import {
  GET_ALL_DOGS,
  GET_ALL_TEMPERAMENTS,
  GET_DOG_DETAIL,
  GET_DOG_NAME,
  FILTER_BY_NAME,
  FILTER_BY_TEMPERAMENTS,
  FILTER_BY_WEIGHT,
  FILTER_CREATED_DOG,
  CLEAR_DETAIL,
  POST_DOG,
  //DELETE_DOG
} from '../action-types/action-types';

//Estados iniciales:

const initialState = {
  dogs: [],
  temperaments: [],
  allDogs: [],
  dogDetail: [],
};

//Aqui se define el estado inicial y se actualiza el estado global. Se esperan dos parámetros:

//State: Que información tiene y lo que vamos a actualizar.
//Action: Contiene un type (que nos dice que vamos a ejecutar) y un payload con la información para actualizar el estado.

//Los reducer basados en el action (type y paylaod), ejectan codigo que actualiza el estado global y se lo envia al store (como un nuevo objeto).

//El payload tambien puede contener un name o continents para filtrar.

const reducer = (state = initialState, action) => {
  //Actulizamos los estados llamando a los actions:
  switch (action.type) {
    //GET DATA
    case GET_ALL_DOGS:
      return {
        //Guarda los estados dogs y allDogs toda la info de /dogs.
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    case GET_DOG_NAME:
      return {
        //Guarda el estado dogs toda la info de /dogs?name=.
        ...state,
        dogs: action.payload,
      };
    case GET_DOG_DETAIL:
      return {
        //Guarda el estado dogDetail toda la info de /dogs/Id.
        ...state,
        dogDetail: action.payload,
      };
    case CLEAR_DETAIL: {
      return {
        //Borra el estado de dogDetail, lo deja en su estado inicia.
        ...state,
        dogDetail: {},
      };
    }
    case GET_ALL_TEMPERAMENTS:
      return {
        //Guarda el estado temperaments toda la info de /temperaments
        ...state,
        temperaments: action.payload,
      };

    //FILTROS

    case FILTER_BY_NAME:
      //En filterDogs se guarda el resultado del filtrado.
      const filteredDogs =
        //Si (action.payload) tiene un payload de A-Z, se filtran alfabeticamente los names de dogs.
        action.payload === 'A-Z'
          ? state.dogs.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              return 0;
            })
          : //Si no, lo contrario Z-A.
            state.dogs.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
              return 0;
            });

      return {
        ...state,
        //Retornamos el estado dogs con los perros filtrados.
        dogs: filteredDogs,
      };

    case FILTER_CREATED_DOG:
      //Guardamos en allDogs todos los dogs.
      const allDogs = state.allDogs;
      //En filterCreated se guarda el resultado del filtrado.
      const filterCreated =
        //Si (action.payload) tiene un payload de created, se filtran los dogs creados en DB.
        action.payload === 'created'
          ? //Filtra los que tienen db dentro.
            allDogs.filter((dog) => dog.db)
          : //Si no nos dan el "created", filtramos los que no tienen db.
            allDogs.filter((dog) => !dog.db);
      return {
        ...state,
        //Si nos dan "all" en payload los enviamos todos, si no, enviamos los filtrados.
        dogs: action.payload === 'all' ? state.allDogs : filterCreated,
      };

    case FILTER_BY_TEMPERAMENTS:
      //Guardamos toda la data.
      const allDogsStand = state.allDogs;
      //Guardamos los datos filtrados
      const filteredTemperaments =
        action.payload === 'All'
          ? //Si nos dan "All" en el payload, enviamos todos los perros.
            allDogsStand
          : //Si no, filtramos por el temperament que nos pase payload.
            allDogsStand.filter((e) => {
              return e.temperament?.includes(action.payload);
            });
      return {
        ...state,
        //Devolvemos lo filtrado.
        dogs: filteredTemperaments,
      };

    case FILTER_BY_WEIGHT:
      //Sacamos los pesos (mayores) de los perros en un array.
      const allWeights = state.allDogs.filter((dog) => dog.weight_maximun);
      //Guardamos el filtrado.
      const filterWeight =
        //Si el payload es "min_weight", vamos de menor a mayor.
        action.payload === 'min_weight'
          ? allWeights.sort((a, b) => {
              return a.weight_maximun - b.weight_maximun;
            })
          : //Si no, vamos de mayor a menor. Lo revertimos.
            allWeights
              .sort((a, b) => {
                return a.weight_maximun - b.weight_maximun;
              })
              .reverse();

      return {
        ...state,
        //Pasamos lo filtrado a dogs.
        dogs: filterWeight,
      };

    //STANDARD
    case POST_DOG:
      //Devuelve los estados (no hace nada)
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};

export default reducer;
