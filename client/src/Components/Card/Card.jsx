//Standard
import React from 'react';
import { Link } from 'react-router-dom';
//CSS
import style from '../Card/Card.module.css';

export default function Card({
  image,
  name,
  temperament,
  weight_minimun,
  weight_maximun,
  id,
}) {
  let tempNoEspaces = temperament.replace(' ', '');
  let tempSeparated = tempNoEspaces.split(',');

  return (
    <div className={style.single_card_container}>
      <div className={style.card_img}>
        <img src={image} alt={`${name}`} height='250px' width='350px' />
      </div>
      <div className={style.card_text}>
        <Link className={style.card_title} to={`/home/${id}`}>
          <h1>{name}</h1>
        </Link>
        <h4 className={style}>
          Weight: {weight_minimun} kg - {weight_maximun} kg.
        </h4>
        <ul className={style.card_list}>
          <h4 className={style.card_list_title}>Temperaments:</h4>
          {tempSeparated?.map((temp, index) => {
            return <li key={index}>{temp}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
