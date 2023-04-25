//Standard Imports.
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
//Actions.
import { getDogName } from '../../redux/actions/actions';
//CSS.
import style from './SearchBar.module.css';

export default function SearchBar({ paginado }) {
  //useDispatch: Accedemos a los dipatch (estados despachados).
  const dispatch = useDispatch();
  //Creamos el estado searchDoggy.
  const [searchDoggy, setSearchDoggy] = useState('');
  //Permite que el usuario navegue hacia atrás y adelante de las páginas de la app que ha visitado.
  const history = useHistory();

  //*HANDLERS

  const handleInput = (input) => {
    //Prohibe que el input quede vacio.
    input.preventDefault();
    //Cambia el valor de searchDoggy al input ingresado.
    setSearchDoggy(input.target.value);
  };

  const handleSubmit = (input) => {
    //Prohibe que el input quede vacio.
    input.preventDefault();
    //Si searchDoggy tiene texto y submitean el input.
    //Se despacha una fun de action enviando el nombre del perro.
    if (searchDoggy) dispatch(getDogName(searchDoggy));
    //Y después de buscarlo limpia la barra.
    setSearchDoggy('');
    //Redirige al user a home (actualizada - con los datos del doggy) después de hacer la búsqueda.
    history.push('/home');
    //Nos posiciona en la página 1.
    paginado(1);
  };

  return (
    <div className={style.searchbar_container}>
      <form className={style.form}>
        <input
          className={style.searchbar}
          type='text'
          //Cada que cambia, se ejecuta handleInput(e)
          onChange={(e) => handleInput(e)}
          value={searchDoggy}
          placeholder='Search for any dog in the world...'
        />
        <button
          className={style.searchbar_button}
          //Cuando se hace submit, ejecuta handleSubmit(e)
          type='submit'
          onClick={(e) => handleSubmit(e)}
        >
          Search Doggy
        </button>
      </form>
    </div>
  );
}
