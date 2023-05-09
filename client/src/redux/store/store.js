import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducer/reducer';

//Conectarnos al navegador
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Redux: Centralizamos los estados (globales) en la store. Como una DB para el Cliente, alberga estados. Los reducer nos pasan los cambios.

const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);

//Los middlewares se utilizan para mejorar la funcionalidad y capacidad de gestión de la store de Redux.
// thunkMiddleware permite que se realicen acciones asíncronas en las acciones de Redux, applyMiddleware lo conecta al proceso de la store.

export default store;
