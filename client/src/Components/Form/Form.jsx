//Standard
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
//Actions
import { postDog, getTemperaments } from '../../redux/actions/actions';
//CSS
import style from './Form.module.css';

//Validamos la data ingresada, agregamos error en caso de error.

const validationData = (input) => {
  //Guardamos los errores.
  let errorsContainer = {};

  //Si hay un error se guarda en el obj errorsContainer.
  //EJ: errorContainer.errorName.
  //Luego verificamos si hay errores por el nombre. Y si los hay (key), mostramos el mensaje (value)

  //Errors List - Prompt

  //NAME
  if (!input.name) {
    errorsContainer.name = 'There must be a name.';
  }

  if (input.name && !/^[a-zA-Z]*$/.test(input.name)) {
    errorsContainer.name = 'The name only can contain letters.';
  }

  //Height - Weight < 0

  if (!input.height_minimun || input.weight_minimun <= 0) {
    errorsContainer.height_minimun =
      'The minimun height must be greater than 0.';
  }

  if (!input.height_maximun || input.height_maximun <= 0) {
    errorsContainer.height_maximun =
      'The maximun height must be greater than 0.';
  }

  if (!input.weight_minimun || input.weight_minimun <= 0) {
    errorsContainer.weight_minimun =
      'The minimun weight must be greater than 0.';
  }

  if (!input.weight_maximun || input.weight_maximun <= 0) {
    errorsContainer.weight_maximun =
      'The maximun weight must be greater than 0.';
  }

  //MENOR NO PUEDE SER MAYOR:

  if (parseInt(input.height_minimun) >= parseInt(input.height_maximun)) {
    errorsContainer.biggerh =
      "Minimun height shouldn't be greater than maximun height.";
  }

  if (parseInt(input.weight_minimun) >= parseInt(input.weight_maximun)) {
    errorsContainer.biggerw =
      "Minimun weight shouldn't be greater than maximun weight.";
  }

  //Height - Weight - Only numbers.

  if (input.height) {
    if (!/^[0-9]*$/) {
      errorsContainer.height = 'The height can only contain numbers.';
    }
  }

  if (input.weight_minimun) {
    if (input.weight_maximun) {
      if (!/^[0-9]*$/) {
        errorsContainer.weight_minimun = 'The weight can only contain numbers.';
      }
    }
  }

  if (input.weight_maximun) {
    if (!/^[0-9]*$/) {
      errorsContainer.weight_maximun = 'The weight can only contain numbers.';
    }
  }

  //Lifespan.

  if (!input.lifespan || input.lifespan <= 0) {
    errorsContainer.lifespan = 'The lifespan must be greather than 0.';
  }

  if (input.lifespan) {
    if (!/^[0-9]*$/) {
      errorsContainer.lifespan = 'The lifespan can only contain numbers.';
    }
  }

  return errorsContainer;
};

//Creamos el formulario.
export default function Form() {
  //useDispatch: Accedemos a los dipatch (estados despachados).
  const dispatch = useDispatch();
  const history = useHistory();
  //Traemos todos los temperaments, selecionando el estado temperaments.
  const allTemperaments = useSelector((state) => state.temperaments);
  //Creamos el objeto errors y lo dejamos como objeto vacio. Guardamos los errors de la verificacion aquí.
  const [errors, setErrors] = useState({});
  //Creamos un objeto input, donde se va a guardar lo que ingrese el cliente. Su valor inicial es 0.
  const [inputValue, setInputValue] = useState({
    name: '',
    height_minimun: 0,
    height_maximun: 0,
    weight_minimun: 0,
    weight_maximun: 0,
    lifespan: 0,
    image: '',
    temperament: [],
  });

  //*CUANDO HAYA CAMBIOS
  //Tomamos el inputClient y le pasamos el varlor a InputValue.
  //Cada input tiene un name distinto, que se llena con su value correspondiente.
  const handleChange = (inputClient) => {
    //Actualiza el objeto "inputValue" (y sus carácteristicas) con el valor del inputClient.
    setInputValue({
      ...inputValue,
      [inputClient.target.name]: inputClient.target.value,
    });
    console.log(inputClient.target.value);
    //Pasamos la data (inputValue) por validationData y si tiene errores, llema el objeto errors.
    setErrors(
      validationData({
        ...inputValue,
        [inputClient.target.name]: inputClient.target.value,
      })
    );
    console.log(inputValue);
  };
  //Renderiza la action getTemperamets (y trae los temperaments) cada que se inicie el Componente y cada que dispatch se actualice.
  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  //*TEMPERAMENT (pueden haber varios):
  //Toma el inputClient (del temperament) y verifica que en inputValue no este el temperament ya puesto o repetido.
  const handleSelect = (inputClient) => {
    if (!inputValue.temperament.includes(inputClient.target.value)) {
      //Si no esta repetido, lo agrega a la var inputValue en la parte de temperament.
      setInputValue({
        ...inputValue,
        temperament: [...inputValue.temperament, inputClient.target.value],
      });
    } else {
      //Si ya está escogido, ponemos un alert.
      alert('This temperament is already chosen.');
    }
  };

  console.log(handleSelect);

  //*BORRAR UN TEMPERAMENT ESCOGIDO:
  const handleErase = (temp) => {
    //Vamos dentro de inputValue y filtramos todos los temperaments, dejamos los que no sean borrados (temp).
    setInputValue({
      ...inputValue,
      temperament: inputValue.temperament.filter((d) => d !== temp),
    });
  };

  //*SUBMIT
  const handleSubmit = (inputValue) => {
    //Prevenimos que se puedan submitear los valores de inputValue por default.
    inputValue.preventDefault();
    //Despachamos la action POST con el valor del inputValue.
    dispatch(postDog(inputValue));
    //Confirmamos la creación.
    alert('The dog was created successfully.');

    //Vaciamos a inputValue.
    setInputValue({
      name: '',
      height_minimun: 0,
      height_maximun: 0,
      weight_minimun: 0,
      weight_maximun: 0,
      lifespan: 0,
      temperament: [],
    });

    //Volvemos a home.
    history.push('/home');
  };

  return (
    <div className={style.background}>
      {/* TITLE */}
      <div className={style.titulo}>
        <h1>NEW DOG FORM!</h1>
        <h4>Please fill all the information.</h4>
      </div>
      {/* SPECS  */}
      <div className={style.contenedor}>
        {/* Le damos el handleSubmit al form */}
        <form className={style.formStyle} onSubmit={(e) => handleSubmit(e)}>
          {/* Debe haber una doble relación, por eso value es inputValue (a pesar de asignarlo con useEffect) */}

          {/* NAME */}
          <div className={style.items}>
            <h3>Name:</h3>
            <input
              required
              className={style.numInput}
              type='text'
              value={inputValue.name}
              name='name'
              onChange={(e) => handleChange(e)}
            />
          </div>

          {/* - WEIGHT */}
          <div className={style.items}>
            <h3>Minumin Weight: </h3>
            <input
              min='0'
              className={style.numInput}
              type='number'
              value={inputValue.weight_minimun}
              name='weight_minimun'
              onChange={(e) => handleChange(e)}
            />
          </div>

          {/* + WEIGHT */}
          <div className={style.items}>
            <h3>Maximun Weight: </h3>
            <input
              min='0'
              className={style.numInput}
              type='number'
              value={inputValue.weight_maximun}
              name='weight_maximun'
              onChange={(e) => handleChange(e)}
            />
          </div>

          {/* + HEIGHT */}
          <div className={style.items}>
            <h3>Minumin Height:</h3>
            <input
              min='0'
              className={style.numInput}
              type='number'
              value={inputValue.height_maximun}
              name='height_maximun'
              onChange={(e) => handleChange(e)}
            />
          </div>

          {/* - HEIGHT */}
          <div className={style.items}>
            <h3>Maximun Height:</h3>
            <input
              min='0'
              className={style.numInput}
              type='number'
              value={inputValue.height_minimun}
              name='height_minimun'
              onChange={(e) => handleChange(e)}
            />
          </div>

          {/* LIFESPAN */}
          <div className={style.items}>
            <h3>Lifespan:</h3>
            <input
              min='0'
              className={style.numInput}
              type='number'
              value={inputValue.lifespan}
              name='lifespan'
              onChange={(e) => handleChange(e)}
            />
          </div>

          {/* TEMPERAMENTS */}
          <div className={style.items}>
            <h3>Temperaments: </h3>
            <select className={style.numInput} onChange={handleSelect}>
              <option value='all' disabled selected defaultValue>
                Choose a temperament.
              </option>
              {/* Mapeamos a los temperaments, mostrar las opciones */}
              {allTemperaments.map((e) => {
                return (
                  <option value={e.name} key={e.id}>
                    {e.name}
                  </option>
                );
              })}
            </select>
          </div>
        </form>
        {/* Mostramos los temperaments agregados */}
        <div className={style.moodDiv}>
          {inputValue.temperament.map((temp, i) => {
            return (
              <div key={i++}>
                <div className={style.btnh3}> {temp} </div>
                <button
                  className={style.eraserbtn}
                  onClick={() => handleErase(temp)}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>
        {/* Confirmamos que existe errors, si sí, seguimos  con el paréntesis*/}
        {/* Mostramos que hay errores y aun no se puede seguir. */}
        {errors &&
        (errors.name ||
          // Si hay algún error.
          errors.height_minimun ||
          errors.height_maximun ||
          errors.weight_minimun ||
          errors.weight_maximun ||
          errors.lifespan ||
          //Si los valores son 0 o menores.
          !inputValue.name.length ||
          inputValue.height_minimun <= 0 ||
          inputValue.height_maximun <= 0 ||
          inputValue.weight_minimun <= 0 ||
          inputValue.weight_maximun <= 0 ||
          inputValue.lifespan <= 0 ||
          //Si los minimun son mayores que los maximun.
          inputValue.height_minimun >= inputValue.height_maximun ||
          inputValue.weight_minimun >= inputValue.weight_maximun ||
          !inputValue.temperament.length) ? (
          <div className={style.btnh2}>
            Dog creation is still in progress (errors found).
          </div>
        ) : (
          <button className={style.btn} type='submit'>
            Create Doggy!
          </button>
        )}
        {/* Mostramos los errores: */}
        {/* Usamos los nombres con los que se guardan en el objeto objectContainer. */}
        {/* Si, el objeto errors (del useState) guarda un error con el nombre puesto en validation, se muestra el <p> con el mensaje (que contiene el objeto - error)*/}
        <div className={style.errorStyle}>
          {/* Hacemos un condicional terciario, si hay errores en el estado errors, se muestra un div con los errors. Si no, nada. */}

          {/* Instrucciones: Que funcione mediante un boton check. Y si si, deje publicar el perro, si no, que muestre los errors. */}

          {Object.keys(errors).lenght !== 0 ? (
            <div>
              <h2>There are some errors:</h2>
              <div className={style.errorStyle}>
                {/* El && es un condicional. 
            EJ: Si se cumple esta parte && se ejecuta esto. */}
                <p>{errors.name && <p> {errors.name} </p>}</p>

                <p>
                  {errors.height_minimun && <p> {errors.height_minimun} </p>}
                </p>

                <p>
                  {errors.height_maximun && <p> {errors.height_maximun} </p>}
                </p>

                <p>
                  {errors.weight_minimun && <p> {errors.weight_minimun} </p>}
                </p>

                <p>
                  {errors.weight_maximun && <p> {errors.weight_maximun} </p>}
                </p>

                <p>{errors.lifespan && <p> {errors.lifespan} </p>}</p>

                <p>{errors.temperament && <p> {errors.temperament} </p>}</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <Link to='/home'>
        <button className={style.btn}>HOME</button>
      </Link>
    </div>
  );
}
