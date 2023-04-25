import React from 'react';
import style from '../Paginated/Paginated.module.css';

export default function Paginate({ numberOfDogsPerPage, dogs, paginado }) {
  //Aqui guardamos los numeros de página, para mostrarlos como li.
  const pageNumbers = [];

  //Dividimos los dogs filtrados entre 8 por página y eso nos da el total de páginas.
  //Ej: 16 dogs / 8 dogs p/p = 2 páginas.
  let totalPages = Math.ceil(dogs / numberOfDogsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    //Pusheamos de 1 hasta el numero de paginas totales.
    pageNumbers.push(i);
  }

  return (
    <nav className={style.back}>
      <ul className={style.ul}>
        {/* Esperamos los numeros de página, y mapeamos cada numero en un li. */}
        {pageNumbers?.map((number) => {
          return (
            <li className={style.list} key={number}>
              {/* El paginado(n) convierte al numero a clickear al numero de página actual. */}
              {/* Y actualiza la página, con el setCurrentPage(pageNumber) */}
              <button onClick={() => paginado(number)}>{number}</button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
