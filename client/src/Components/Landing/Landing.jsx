import React from 'react';
//Standard
import { Link } from 'react-router-dom';
import style from './Landing.module.css';
import landing_dog from '../../images/dog.png';

function Landing() {
  return (
    <div className='flex bg-landingb justify-evenly justify-items-end w-screen h-screen'>
      <div className='flex text-center text-bluetext flex-col justify-center items-center w-[600px] ml-[200px] mt-[-100px]'>
        <h1 className={style.title}>DogWorld</h1>
        <p className='text-[25px] font-lilita'>by GustinDev</p>
        <Link to='/home'>
          <button className='font-lilita inline-block cursor-pointer border-0 rounded-[10px] text-white bg-blue-500 text-[25px] leading-28 px-[30px] py-[5px] text-center mt-[30px] tracking-wide hover:bg-hoverbtn shadow-md'>
            Let's Go!
          </button>
        </Link>
      </div>
      <div className='flex items-end'>
        <img
          className='flex w-[700px] h-[740px]'
          src={landing_dog}
          alt='landing_dog'
        />
      </div>
    </div>
  );
}

export default Landing;
