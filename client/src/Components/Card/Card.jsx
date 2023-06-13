//Standard
import React from 'react';
import { Link } from 'react-router-dom';
//CSS

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
    <div className='w-[275px] h-[485px] md:w-[375px] md:h-[585px] font-roboto bg-cardb m-5 rounded-2xl shadow-lg shadow-lightblue transition duration-100 transform hover:scale-105 '>
      <Link to={`/home/${id}`} style={{ textDecoration: 'none' }}>
        <div className='h-[160px]  md:w-[375px] md:h-[260px]'>
          <img
            src={image}
            alt={`${name}`}
            className='rounded-tr-xl rounded-tl-xl w-[275px] h-[160px] md:w-[375px] md:h-[260px]'
          />
        </div>
        <h3 className='flex rounded-tr-xl mb-10 md:mb-0 rounded-br-xl text-white font-bold text-[18px] bg-backgroundw md:relative md:top-[-26px] w-[200px] text-start pl-2'>
          Weight: {weight_minimun} kg - {weight_maximun} kg.
        </h3>
        <div className='flex flex-col justify-center items-center'>
          <div className='flex text-[35px] font-lilita text-backgroundw h[100px] mt-[-25px]'>
            <h1>{name}</h1>
          </div>

          <h4 className='font-lilita text-backgroundw text-[20px] mb-5'>
            Temperaments:
          </h4>
          <ul className='-ml-10 w-[220px] md:w-[320px] md:h-[150px] md:m-0 list-none list-disc list-inside columns-2 '>
            {tempFinal?.map((temp, index) => {
              return (
                <li
                  key={index}
                  className='text-[18px] text-backgroundw font-bold text-start w-[155px]'
                >
                  🌍{temp}
                </li>
              );
            })}
          </ul>
        </div>
      </Link>
    </div>
  );
}
