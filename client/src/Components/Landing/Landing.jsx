import React from 'react';
//Standard
import { Link } from 'react-router-dom';
import landing_dog from '../../images/dog.png';

function Landing() {
  return (
    <div className='flex flex-col justify-end  sm:justify-center sm:items-center lg:flex-row  bg-landingb justify-evenly justify-items-end w-screen h-screen'>
      <div className='flex w-full h-1/2 sm:flex text-center text-bluetext flex-col justify-center items-center sm:w-1/2'>
        <h1 className='text-[60px] sm:text-[80px] font-lilita xl:text-[120px]'>
          DogWorld
        </h1>
        <p className='text-[25px] font-lilita'>by GustinDev</p>
        <Link to='/home'>
          <button className='font-lilita inline-block cursor-pointer border-0 rounded-[10px] text-white bg-blue-500 text-[25px] leading-28 px-[30px] py-[5px] text-center mt-[30px] tracking-wide hover:bg-hoverbtn shadow-md'>
            Let's Go!
          </button>
        </Link>
      </div>
      <div className='w-full flex h-1/2 items-end justify-center sm:w-1/2 md:items-center'>
        <img
          className='w-[450px] h-[450px] sm:flex sm:w-90 sm:h-90 md:w-[450px] md:h-[450px] lg:w-[850px] lg:h-[850px]'
          src={landing_dog}
          alt='landing_dog'
        />
      </div>
    </div>
  );
}

export default Landing;
