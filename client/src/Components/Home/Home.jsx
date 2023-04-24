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
  //Trae los dogs del estado global.
  const allDogs = useSelector((state) => state.dogs);
  //Trae todos los temperaments del estado global.
  const allTemperaments = useSelector((state) => {
    return state.temperaments;
  });

  //*PAGINADO:
  //Nos posicionamos en la primer página (por cada cambio).
  const [currentPage, setCurrentPage] = useState(1);
  //Ponemos el limite de dogs a 8 per page.
  // eslint-disable-next-line
  const [dogsPerPage, setDogPerPage] = useState(8);
  //Sacamos lo index (primer perro y ultimo perro por página).
  const indexLastDog = currentPage * dogsPerPage;
  const indexFirstDog = indexLastDog - dogsPerPage;
  //Sacamos un array de los perros (de la página actual) de alldogs.
  //EJ: Perros entre 8 - 16
  const currentDogs = allDogs.slice(indexFirstDog, indexLastDog);
  //Creamos var paginado (y le damos el valor de la página actual).
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
      <header>
        <div className={style.arreglar}>
          <Link to='/'>
            <button className={style.logo}>DogWorld</button>
          </Link>
        </div>
        <div className={style.headerContainerLeft}>
          <div className={style.arreglo}>
            <button
              className={style.btn}
              onClick={(e) => {
                handleClick(e);
              }}
            >
              {' '}
              Get Dogs
            </button>
            <Link to='/create'>
              <button className={style.btn}>Create Dog</button>
            </Link>
          </div>
          <div className={style.headerLeft}>
            <SearchBar paginado={paginado} />
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

      {/* BODY */}

      <div>
        {Object.keys(allDogs).length ? (
          <div className={style.container_cards}>
            {currentDogs?.map((el) => {
              return (
                <div className={style.main_container} key={el.id}>
                  {
                    <Card
                      key={el.id}
                      id={el.id}
                      image={el.image}
                      name={el.name}
                      temperament={el.temperament}
                      weight_minimun={el.weight_minimun}
                      weight_maximun={el.weight_maximun}
                    />
                  }
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h1>LOADING...</h1>
          </div>
        )}
      </div>
      {/* A Paginate le pasamos: 
      1. Limite de Perros P/Página. 2. Todos los perros de actions
      alldogs( /dogs). 
      3.Paginado (creo, pagina actual). */}
      <Paginate
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        paginado={paginado}
      />
    </div>
  );
}
