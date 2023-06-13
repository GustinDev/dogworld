import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDog, clearDetail } from '../../redux/actions/actions';
//CSS
import dogGif from '../../images/dogif.gif';

//Props es lo que está en la URL, (de aqui sacamos el ID).
export default function Detail(props) {
  //useDispatch: Accedemos a los dipatch (estados despachados).
  const dispatch = useDispatch();
  //useSelector: Seleccionamos una parte del estado global - Store (dogs, alldogs, etc).
  //Trae el dogDetail del estado global /dog/id).
  const dogDetail = useSelector((state) => state.dogDetail);
  // eslint-disable-next-line
  const [currentPage, setCurrentPage] = useState(1);

  //Pide que se realice una acción específica cada que se cargue la pargina -o se cambie el estado-,
  //Traer la data del dogDetail(actions), le pasamos el id.
  //Y que se limpie el dogDetail, después de buscar.

  useEffect(() => {
    //Le pasamos el ID de props.params (url), para que sepa que objeto traer del back.
    dispatch(getDog(props.match.params.id));
    return dispatch(clearDetail());
    // eslint-disable-next-line
  }, [dispatch]);

  //* Después de ejecutar el action, el estado dogDetail se llena con el JSON que el back nos dio (según el ID).
  //* Accedemos  a la data con dogDetail[0] porque es un array de objetos, que solo contiene uno. Lo pasamos a otro var para no tener que hacerlo siempre.
  //*Con dogDetailFinal accedemos al dog normalmente, como un objeto (similar a lo que vemos en dogs/id).

  let dogDetailFinal = dogDetail[0];
  // console.log(dogDetailFinal);

  //Arreglamos los temperaments:
  //Quitamos los espacios, "," y convertimos a los temperamentos en array.
  let tempSeparated = dogDetail[0]?.temperament?.split(',');
  console.log(tempSeparated);
  let tempFinal = tempSeparated?.map((temp) => {
    return temp.trim();
  });

  return (
    <div>
      {/* Si el estado dogDetail no está vacio (y mientras se carga), generamos esto: */}
      {Object.keys(dogDetail).length ? (
        <div className='flex flex-col lg:flex-row bg-cardb rounded-lg shadow-lg shadow-lightblue justify-center'>
          <img
            className='w-[350px] h-[200px]  md:w-[600px] md:h-[400px] lg:w-[800px] lg:h-[600px] rounded-tl-lg rounded-bl-lg'
            src={
              dogDetailFinal.image
                ? dogDetailFinal.image
                : (dogDetailFinal.image =
                    'https://static.vecteezy.com/system/resources/previews/001/200/028/original/dog-png.png')
            }
            alt={dogDetailFinal.name}
          />
          <div>
            <div className='font-roboto p-5 w-[350px] md:w-[500px] text-backgroundw'>
              <h1 className='text-[30px] font-lilita text-start'>
                {' '}
                Name: {dogDetailFinal.name}
              </h1>

              <div className='w-[350px] text-start font-roboto text-[20px] font-bold'>
                <h2> ID: {dogDetailFinal.id}</h2>
                <h2> Lifespan: {dogDetailFinal.lifespan}</h2>
                <h2> Height: {dogDetailFinal.height} cm.</h2>
                <h2>
                  Weight: {dogDetailFinal.weight_minimun} -
                  {dogDetailFinal.weight_maximun} kg.
                </h2>

                <div>
                  <div>
                    <h2 className='text-[25px] font-lilita font-normal my-2'>
                      Temperaments:
                    </h2>
                    <ul className='list-none'>
                      {tempFinal?.map((temp, index) => {
                        return (
                          <li className='text-[20px] ' key={index}>
                            🌍{temp}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              <Link to='/home'>
                <button className='font-lilita inline-block cursor-pointer border-0 rounded-[10px] text-white bg-blue-500 text-[25px] leading-28 px-[30px] py-[5px] text-center mt-[30px] tracking-wider hover:bg-hoverbtn shadow-md '>
                  Go Back!
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        // Mientras no cargue, creamos un loading
        <div className='flex justify-center items-center flex-col'>
          <h1 className='text-[50px] text-lightblue font-lilita tracking-wide mt-[20px] mb-[-60px]'>
            LOADING!
          </h1>
          <img
            className='w-[500px] h-[500px] mt-[-80px]'
            src={dogGif}
            alt='gif'
          />
        </div>
      )}
    </div>
  );
}
