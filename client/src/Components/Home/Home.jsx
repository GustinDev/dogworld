//Standard Import
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
//Import actions.
import {
  filterByName,
  filterCreatedDog,
  filterByWeight,
  FilterByTemperament,
  getAllDogs,
  getTemperaments,
} from '../../redux/actions/actions';
//Importamos Componentes Especificos.
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar';
import Paginate from '../Paginated/Paginated';
//CSS
import style from './Home.module.css';

export default function Home() {
  //TODO: ¿Cómo traer la data?
  //TODO: 1. Accediendo al Estado Global con useSelector.
  //TODO: 2. Accediendo al la función creado por action.

  //*TRAER DATA:
  //useDispatch: Accedemos a los dipatch (estados despachados).
  const dispatch = useDispatch();
  //useSelector: Seleccionamos una parte del estado global - Store (dogs, alldogs, etc).
  //Trae los dogs del estado global (dogs trae los perros normales y filtrados (actual)).
  const dogs = useSelector((state) => state.dogs);
  //Trae todos los temperaments del estado global.
  const allTemperaments = useSelector((state) => {
    return state.temperaments;
  });

  //*PAGINADO:
  //Creamos un estado que maneja la página actual.
  const [currentPage, setCurrentPage] = useState(1);
  //Ponemos el limite de dogs a 8 per page.
  // eslint-disable-next-line
  const [numberOfDogsPerPage, setNumberOfDogsPerPage] = useState(8);
  //Sacamos lo index (primer perro y ultimo perro, según la página).
  //Pagina 2 -> 2 * 8 -> indexLastDog = 16

  //*¿Cómo obtenemos los dogs especificos de cada página?
  //Sacamos los numeros de index del Primero y Ultimo dog de cada página.
  const indexLastDog = currentPage * numberOfDogsPerPage;
  //Pagina 2 -> 2 * 8. indexLastDog = 16.
  const indexFirstDog = indexLastDog - numberOfDogsPerPage;
  //Pagina 2 -> 16 - 18 indexFirstDog = 8.
  //Luego hacemos un Slice, a allDogs con esos index (guardamos los objetos cortados).
  //Slice: Corta y guarda en un array, los objetos de dogs cuyos index estén entre First y Last.
  const currentDogsInPage = dogs.slice(indexFirstDog, indexLastDog);
  //Sacamos un array de los perros (de la página actual), para mostrarlos.
  //EJ: P2: [8...16]

  //*¿Cómo vemos los dogs especificos de cada página?
  //Paginado(n) y setCurrentPage(n) modifican a currentPage() y currentDogsInPage() - con useState.
  //Se modifican al darle click al li de Paginated.
  //Al final, currentDogsInPage() es el array mapeado en el body por Cards.

  //Creamos var paginado (y le damos el valor de la página actual).
  //setCurrentPage(pageNumber) puede cambiar el numero de página que vemos
  //y por lo tanto sus objetos.
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //* USEEFFECT

  //Pide que se realicen dos acciones especificas cada que se cargue la pargina (porque toman tiempo, debido a que traen data, es para hacerlo asincrono).

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getTemperaments());
    // eslint-disable-next-line
  }, []);

  //*HANDLERS - FILTERS

  //Muestra que orden le estamos dando.
  // eslint-disable-next-line
  const [orden, setOrden] = useState('');

  //General:
  //e.preventDefault() -> Sirve para que no se pueda elergir la opción default (y se envie, hasta elegit opción).
  //setCurrentPage(1); -> Por cada filtro, nos seteamos en la página 1.
  //action(option.target.value) -> Envia el valor de la opción elegida (EJ: "all") al reducer.

  //1.Despacha la action filterByName y le pasa al reducer una de las opciones: "A-Z" o Z-A

  function handlerFilterName(e) {
    dispatch(filterByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Order: ${e.target.value}`);
  }

  //2.Despacha la action filterByName y le pasa al reducer una de las opciones: "max_weight" o "min_weight".

  function handlerFilterWeight(option) {
    dispatch(filterByWeight(option.target.value));
    setCurrentPage(1);
    setOrden(`Order: ${option.target.value}`);
  }

  //3.Despacha la action FilterByTemperament y le pasa al reducer los Temperaments disponibles.

  function handlerFilterTemperament(option) {
    // -> ¿Porqué no funcionan preventDefault()?
    option.preventDefault();
    dispatch(FilterByTemperament(option.target.value));
    setCurrentPage(1);
  }

  //4. Despacha la action filterCreatedDog y le pasa una de las opciones: "all", "created" o "api".
  function handlerFilterCreated(option) {
    dispatch(filterCreatedDog(option.target.value));
    setCurrentPage(1);
  }

  //Hace que la pagina no se recargue cuando haya clicks.
  function handleClick(e) {
    window.location.reload(false);
  }

  return (
    <div className={style.background}>
      {/* NAV */}

      <header>
        <div className={style.arreglar}>
          {/* LINK LANDING */}

          <Link to='/'>
            <button className={style.logo}>DogWorld</button>
          </Link>
        </div>
        <div className={style.headerContainerLeft}>
          <div className={style.arreglo}>
            {/* LINK RESTART */}
            <button
              className={style.btn}
              onClick={(e) => {
                handleClick(e);
              }}
            >
              {' '}
              Start Again
            </button>

            {/* LINK CREATE DOG */}

            <Link to='/create'>
              <button className={style.btn}>Create a New Dog</button>
            </Link>
          </div>
          {/* SEARCHBAR */}
          {/* Le pasamos en que página estamos: "1" */}

          <div className={style.headerLeft}>
            <SearchBar paginado={paginado} />

            {/* FILTERS */}
            {/* Invocamos los handlers */}
            {/* Usamos select y option para mandar los parametros a los reducer */}
            <div className={style.containerFilters}>
              <select onChange={(e) => handlerFilterName(e)}>
                <option defaultValue>Order by name</option>
                <option key={1} value='A-Z'>
                  A-Z
                </option>
                <option key={2} value='Z-A'>
                  Z-A
                </option>
              </select>

              <select onChange={(e) => handlerFilterWeight(e)}>
                <option defaultValue>Order by weight</option>
                <option key={1} value='max_weight'>
                  Max - Min
                </option>
                <option key={2} value='min_weight'>
                  Min - Max
                </option>
              </select>

              <select onChange={(e) => handlerFilterTemperament(e)}>
                <option defaultValue>Temperaments</option>
                <option key={1 + 'e'} value='All'>
                  All
                </option>
                {allTemperaments.map((temp) => (
                  <option value={temp.name} key={temp.id}>
                    {temp.name}
                  </option>
                ))}
              </select>

              <select onChange={(e) => handlerFilterCreated(e)}>
                <option defaultValue>Order by Creation</option>
                <option key={1} value='all'>
                  All
                </option>
                <option key={2} value='created'>
                  Created
                </option>
                <option key={3} value='api'>
                  API
                </option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* BODY - CARDS */}
      {/* DOCUMENTAR  */}
      <div>
        {/* Si all dogs tiene keys (es para ver si ya cargó): */}
        {Object.keys(dogs).length ? (
          <div className={style.container_cards}>
            {/* Mapea los dogs por página, entre First y Last (8) */}
            {currentDogsInPage?.map((dogPerPage) => {
              return (
                <div className={style.main_container} key={dogPerPage.id}>
                  {
                    // Llenamos la card, con la info de los dogs.
                    <Card
                      key={dogPerPage.id}
                      id={dogPerPage.id}
                      image={dogPerPage.image}
                      name={dogPerPage.name}
                      temperament={dogPerPage.temperament}
                      weight_minimun={dogPerPage.weight_minimun}
                      weight_maximun={dogPerPage.weight_maximun}
                    />
                  }
                </div>
              );
            })}
          </div>
        ) : (
          // Mientras no cargue, creamos un loading
          <div>
            <h1>LOADING...</h1>
          </div>
        )}
      </div>
      {/* A Paginate le pasamos: 
      1. Limite de Perros P/Página.
      2. dogs, estado que guarda los perros filtrado. 
      3. Paginado (pagina actual). */}
      <Paginate
        numberOfDogsPerPage={numberOfDogsPerPage}
        dogs={dogs.length}
        paginado={paginado}
      />
    </div>
  );
}