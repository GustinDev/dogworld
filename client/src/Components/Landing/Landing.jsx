import React from 'react';
//Standard
import { Link } from 'react-router-dom';
import style from './Landing.module.css';
import landing_dog from '../../images/dog.png';
import svg from '../../images/wavesNegative.svg';

function Landing() {
  return (
    <div className={style.container}>
      <div className={style.text}>
        <h1 className={style.title}>DogWorld</h1>
        <p>by GustinDev</p>
        <Link to='/home'>
          <button className={style.buttonOne}>Let's Go!</button>
        </Link>
      </div>
      <div className={style.image}>
        <img src={landing_dog} alt='landing_dog' />
      </div>
      <img src={svg} className={style.waves} alt='svg' />
    </div>
  );
}

export default Landing;
