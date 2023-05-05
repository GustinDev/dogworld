//Importamos las acciones:

import {
  GET_ALL_DOGS,
  GET_ALL_TEMPERAMENTS,
  GET_DOG_DETAIL,
  GET_DOG_NAME,
  FILTER_BY_NAME,
  FILTER_BY_TEMPERAMENTS,
  FILTER_BY_WEIGHT,
  FILTER_BY_HEIGHT,
  FILTER_CREATED_DOG,
  CLEAR_DETAIL,
  POST_DOG,
  //CREAR
  //FILTER_BY_HEIGHT,
  //DELETE_DOG
} from '../action-types/action-types';

//Estados iniciales:

const initialState = {
  dogs: [], //estado para data filtrada
  temperaments: [], //estado para temperaments
  allDogs: [], //estado para la data completa
  dogDetail: [], //estado  para los detalles
};

//Definimos los estados iniciales globales para actualizarlos (con la data de los actions).

//Los reducer esperan dos parámetros:
//State:Estado a modificar(contenedor de data).
//Action:
//1.Type (nombre de lo que vamos a ejecutar).
//2.Payload (data para actualizar el estado). Si es de back, es data JSON. Y si es de front, palabras-instrucciones. Ejemplo: filterByName("A-Z"). Aqui podemos definir que palabra y luego la llamamos en los Componentes.

//Los reducer ejectan codigo que actualiza el estado global (con el type y payload de los actions) y se lo envia al store (dónde guardan los estados globales).

const reducer = (state = initialState, action) => {
  //Actulizamos la data de los estados llamando a los actions:
  switch (action.type) {
    //*GET GENERAL DATA

    case GET_ALL_DOGS:
      return {
        //Guarda en los estados dogs y allDogs toda la info de /dogs.
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
        //Borra-reinicia el estado de dogDetail.
        ...state,
        dogDetail: {},
      };
    }
    case GET_ALL_TEMPERAMENTS:
      return {
        //Guarda en el estado temperaments toda la info de /temperaments
        ...state,
        temperaments: action.payload,
      };

    case POST_DOG:
      //Devuelve los estados.
      return {
        ...state,
      };

    //*FILTROS
    //*Los perros se alinean segun el filtro que retornemos. Le damos los pesos ordenados y los dogs (estado) se alinean con esa propiedad.

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

    case FILTER_BY_HEIGHT:
      //Sacamos las alturas de los perros en un array.
      const allHeights = state.allDogs.filter((dog) => dog.height);
      //Guardamos el filtrado.
      const filterHeight =
        //Si el payload es "short", vamos de menor a mayor.
        //! DOCUMENTAR
        action.payload === 'short'
          ? allHeights.sort((a, b) => {
              const [minA, maxA] = a.height
                .split(' - ')
                .map((h) => parseInt(h));
              const [minB, maxB] = b.height
                .split(' - ')
                .map((h) => parseInt(h));
              return minA - minB || maxA - maxB;
            })
          : //Si no, vamos de mayor a menor. Lo revertimos.
            allHeights.sort((a, b) => {
              const [minA, maxA] = a.height
                .split(' - ')
                .map((h) => parseInt(h));
              const [minB, maxB] = b.height
                .split(' - ')
                .map((h) => parseInt(h));
              return minB - minA || maxB - maxA;
            });

      return {
        ...state,
        //Pasamos lo filtrado a dogs.
        dogs: filterHeight,
      };

    default:
      return { ...state };
  }
};

export default reducer;
