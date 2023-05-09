//Standard Import
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//Import React, RRD y Store
import { Provider } from 'react-redux';
import store from './redux/store/store';
import { BrowserRouter } from 'react-router-dom';

//Le proveemos a nuestra app.js o main.jx acceso a nuestra store (los envolvemos en un Stado Global).
//También los envolvemos en Browser Router para crear la rutas.

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
