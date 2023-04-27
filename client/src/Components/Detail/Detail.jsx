import style from './Detail.module.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDog, clearDetail } from '../../redux/actions/actions';

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
    //Le pasamos el ID de params (url), para que sepa que objeto traer del back.
    dispatch(getDog(props.match.params.id));
    return dispatch(clearDetail());
    // eslint-disable-next-line
  }, [dispatch]);

  //TODO: Accedemos con a la data con dogDetail[0] porque es un array de objetos, que solo contiene uno. Lo pasamos a otro var para no tener que hacerlo siempre.

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
    <div className={style.detail_container}>
      {/* Si el estado dogDetail no está vacio (y mientras se carga), generamos esto: */}
      {Object.keys(dogDetail).length ? (
        <div className={style.detail_card}>
          <img
            src={
              dogDetailFinal.image
                ? dogDetailFinal.image
                : (dogDetailFinal.image =
                    'https://static.vecteezy.com/system/resources/previews/001/200/028/original/dog-png.png')
            }
            alt={dogDetailFinal.name}
          />
          <div className={style.detail_text_container}>
            <div className={style.detail_text}>
              <h1> Name: {dogDetailFinal.name}</h1>
              <div className={style.detail_text_specs}>
                <h2> Lifespan: {dogDetailFinal.lifespan}</h2>
                <h2> Height: {dogDetailFinal.height} cm.</h2>
                <h2>
                  Weight: {dogDetailFinal.weight_minimun} -
                  {dogDetailFinal.weight_maximun} kg.
                </h2>
                <div className={style.detail_temp}>
                  <div className={style.detail_temp}>
                    <h2>Temperaments:</h2>
                    <h3>
                      {tempFinal?.map((temp, index) => {
                        return <li key={index}>🌍{temp}</li>;
                      })}
                    </h3>
                  </div>
                </div>
              </div>

              <Link to='/home'>
                <button className={style.detail_button}>Go Back!</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {' '}
          <h1>LOADING</h1>{' '}
        </div>
      )}
    </div>
  );
}
