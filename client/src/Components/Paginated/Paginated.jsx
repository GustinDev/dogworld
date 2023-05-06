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
    <div className={style.paginate_container}>
      {/* Esperamos los numeros de página, y mapeamos cada numero en un li. */}
      {/* El paginado(n) convierte al numero a clickear al numero de página actual. */}
      {/* Y actualiza la página, con el setCurrentPage(pageNumber) */}
      {/TODO* TENEMOS QUE CAMBIAR EL COLOR DE PAGINATE */}
      {pageNumbers?.map((number) => {
        return (
          <button
            key={number}
            className={style.paginate_item}
            onClick={() => paginado(number)}
          >
            {number}
          </button>
        );
      })}
    </div>
  );
}
