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
  //Quitamos los espacios, "," y convertimos a los temperamentos en array.
  let tempSeparated = temperament?.split(',');
  let tempFinal = tempSeparated?.map((temp) => {
    return temp.trim();
  });

  return (
    <div className={style.single_card_container}>
      <Link to={`/home/${id}`} style={{ textDecoration: 'none' }}>
        <div className={style.card_img}>
          <img src={image} alt={`${name}`} height='260px' width='375px' />
        </div>
        <h3 className={style.card_weight}>
          Weight: {weight_minimun} kg - {weight_maximun} kg.
        </h3>
        <div className={style.card_text}>
          <div className={style.card_title}>
            <h1>{name}</h1>
          </div>

          <h4 className={style.card_list_title}>Temperaments:</h4>
          <ul className={style.card_list}>
            {tempFinal?.map((temp, index) => {
              return <li key={index}>🌍{temp}</li>;
            })}
          </ul>
        </div>
      </Link>
    </div>
  );
}
