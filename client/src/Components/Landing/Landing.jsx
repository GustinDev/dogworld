import React from 'react';
//Standard
import { Link } from 'react-router-dom';
import style from './Landing.module.css';
import landing_dog from '../../images/dog.png';

function Landing() {
  return (
    <div className='flex justify-end sm:flex flex-col sm:flex bg-landingb justify-evenly justify-items-end w-screen h-screen'>
      <div className='flex w-full h-1/2 sm:flex text-center text-bluetext flex-col justify-center items-center w-1/2'>
        <h1 className='text-[60px] sm:text-[120px] font-lilita'>DogWorld</h1>
        <p className='text-[25px] font-lilita'>by GustinDev</p>
        <Link to='/home'>
          <button className='font-lilita inline-block cursor-pointer border-0 rounded-[10px] text-white bg-blue-500 text-[25px] leading-28 px-[30px] py-[5px] text-center mt-[30px] tracking-wide hover:bg-hoverbtn shadow-md'>
            Let's Go!
          </button>
        </Link>
      </div>
      <div className='w-full flex h-1/2 sm:flex items-end w-1/2 justify-center items-center'>
        <img
          className='w-[350px] h-[360px] sm:flex w-[700px] h-[740px] '
          src={landing_dog}
          alt='landing_dog'
        />
      </div>
      <div className='text black sm:text-white text-3xl md:text-blue'></div>
    </div>
  );
}

export default Landing;
