import React from 'react';
//import style from './Card.module.css';
import { Link } from 'react-router-dom';

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
        <img src={image} alt={`${name}`} height='250px' width='350px' />
      </div>

      <div>
        <div>
          <Link to={`/home/${id}`}>
            <h3>{name}</h3>
          </Link>
          <h2>{temperament}</h2>
          <h2>
            Minimun Weight: {weight_minimun} KG - Maximun Weight{' '}
            {weight_maximun} KG.
          </h2>
        </div>
      </div>
    </div>
  );
}
