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

  return (
    <div className={style.detail_card}>
      {/* Si el estado dogDetail no está vacio (y mientras se carga), generamos esto: */}
      {Object.keys(dogDetail).length ? (
        <div className={style.general}>
          <img
            src={
              dogDetail[0].image
                ? dogDetail[0].image
                : (dogDetail[0].image =
                    'https://static.vecteezy.com/system/resources/previews/001/200/028/original/dog-png.png')
            }
            alt='woof'
            width='400'
            height='400'
          />
          <div className={style.dogdetail}>
            <h1> Name : {dogDetail[0].name}</h1>
            <h2> Lifespan: {dogDetail[0].lifespan}</h2>
            <h2> Height:{dogDetail[0].height} cm.</h2>
            <h2>
              Weight: {dogDetail[0].weight_minimun} -
              {dogDetail[0].weight_maximun} kg.
            </h2>
            <div>
              <h2>Temperaments: </h2>
              <h2>{dogDetail[0].temperament}</h2>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {' '}
          <h1>LOADING</h1>{' '}
        </div>
      )}
      <Link to='/home'>
        <button className={style.home_button}>Go Back!</button>
      </Link>
    </div>
  );
}
