//Standard Imports.
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
//Actions.
import { getDogName } from '../../redux/actions/actions';
//CSS.

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
    <div className='w-[300px] md:w-[600px] lg:h-[68px] p-2  flex justify-center m-auto'>
      <form className='flex flex-row my-0 md:mt-5'>
        <input
          className='w-[250px] md:w-[500px]  lg:mt-0 md:h-[30px]  lg:h-[30px] outline-bluetext b-2 rounded-lg'
          type='text'
          //Cada que cambia, se ejecuta handleInput(e)
          onChange={(e) => handleInput(e)}
          value={searchDoggy}
          placeholder='Search for any dog in the world!'
        />
        <button
          className='font-lilita inline-block cursor-pointer border-0 rounded-[10px] text-white bg-blue-500 text-[15px] leading-28 px-[20px] py-[5px] mx-2 text-center tracking-wider hover:bg-hoverbtn shadow-md '
          //Cuando se hace submit, ejecuta handleSubmit(e)
          type='submit'
          onClick={(e) => handleSubmit(e)}
        >
          Go!
        </button>
      </form>
    </div>
  );
}
