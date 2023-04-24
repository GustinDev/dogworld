import React from 'react';
//import style from './Card.module.css';
import { Link } from 'react-router-dom';

//Carmbiar Data.
export default function Card({
  image,
  name,
  temperament,
  weight_minimun,
  weight_maximun,
  id,
}) {
  return (
    <div>
      <div>
        <img
          src={image}
          alt={`imagen de: ${name}`}
          height='250px'
          width='200px'
        />
      </div>

      <div>
        <div>
          <Link to={`/home/${id}`}>
            <h3>{name}</h3>
          </Link>
          <h2>{temperament}</h2>
          <h2>
            MIN. WEIGHT: {weight_minimun} Kg / MAX. WEIGHT {weight_maximun} Kg
          </h2>
        </div>
      </div>
    </div>
  );
}
