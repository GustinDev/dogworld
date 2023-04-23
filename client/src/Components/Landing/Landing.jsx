import React from 'react';
//Standard
import { Link } from 'react-router-dom';
//import style from './Landing.module.css';

function Landing() {
  return (
    <div>
      <h1>DogWorld</h1>
      <p>by GustinDev</p>
      <Link to='/home'>
        <button>Let's Goa!</button>
      </Link>
    </div>
  );
}

export default Landing;
