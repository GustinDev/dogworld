//Standard
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
//Actions
import { postDog, getTemperaments } from '../../redux/actions/actions';
//CSS
import style from './Form.module.css';

//Validamos la data ingresada.

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

  if (input.name && !/^([a-zA-Z ]){2,30}$/.test(input.name)) {
    errorsContainer.name2 = 'The name only can contain letters an spaces.';
  }

  //Height - Weight < 0

  if (!input.minimun_height || input.minimun_weight <= 0) {
    errorsContainer.minimun_height0 =
      'The minimun height must be a number greater than 0.';
  }

  if (!input.maximun_height || input.maximun_height <= 0) {
    errorsContainer.maximun_height0 =
      'The maximun height must be a number greater than 0.';
  }

  if (!input.minimun_weight || input.minimun_weight <= 0) {
    errorsContainer.minimun_weight0 =
      'The minimun weight must be a number greater than 0.';
  }

  if (!input.maximun_weight || input.maximun_weight <= 0) {
    errorsContainer.maximun_weight0 =
      'The maximun weight must be a number greater than 0.';
  }

  //MENOR NO PUEDE SER MAYOR:

  if (parseInt(input.minimun_height) > parseInt(input.maximun_height)) {
    errorsContainer.biggerh =
      "Minimun height shouldn't be greater than maximun height.";
  }

  if (parseInt(input.minimun_weight) > parseInt(input.maximun_weight)) {
    errorsContainer.biggerw =
      "Minimun weight shouldn't be greater than maximun weight.";
  }

  //Height - Weight - Only numbers.

  if (input.minimun_height) {
    if (!/^[0-9]*$/) {
      errorsContainer.height = 'The height can only contain numbers.';
    }
  }

  if (input.maximun_height) {
    if (!/^[0-9]*$/) {
      errorsContainer.height = 'The height can only contain numbers.';
    }
  }

  if (input.minimun_weight) {
    if (!/^[0-9]*$/) {
      errorsContainer.minimun_weight = 'The weight can only contain numbers.';
    }
  }

  if (input.maximun_weight) {
    if (!/^[0-9]*$/) {
      errorsContainer.maximun_weight = 'The weight can only contain numbers.';
    }
  }

  //Lifespan.

  if (!input.lifespan || input.lifespan <= 0) {
    errorsContainer.lifespan = 'The lifespan must be a number greater than 0.';
  }

  if (input.lifespan) {
    if (!/^[0-9]*$/) {
      errorsContainer.lifespan = 'The lifespan can only contain numbers.';
    }
  }

  return errorsContainer;
};

//*FORM

export default function Form() {
  //useDispatch: Accedemos a los dipatch (estados globales despachados).
  const dispatch = useDispatch();

  // eslint-disable-next-line
  const history = useHistory();

  //Traemos todos los temperaments, selecionando el estado temperaments.

  const allTemperaments = useSelector((state) => state.temperaments);
  //Creamos el objeto errors y lo dejamos como objeto vacio. Guardamos los errors de la verificacion aquí.
  const [errors, setErrors] = useState({});

  //Creamos un objeto inputValue. En este estado-objeto se guarda todo lo que ingrese el usuario en los input (esto pero actualizado es lo que POSTEAMOS).
  const [inputValue, setInputValue] = useState({
    name: '',
    minimun_height: 0,
    maximun_height: 0,
    minimun_weight: 0,
    maximun_weight: 0,
    lifespan: 0,
    temperament: [],
  });

  //*CAMBIOS EN INPUT - INGRESO DE DATA

  //?InputValue = Objeto "final" que guarda los datos del input.
  //?InputClient = Lo que ingresa el usuario en cada input.

  //Tomamos el inputClient y le pasamos el varlor a InputValue.
  //Cada input tiene un name distinto, que se llena con su value correspondiente.
  const handleChange = (inputClient) => {
    //Actualiza el objeto "inputValue" (y sus carácteristicas) con el valor del inputClient.
    setInputValue({
      ...inputValue,
      [inputClient.target.name]: inputClient.target.value,
      //EJ: lifespan: 5
    });

    //Pasamos la data (inputValue) por validationData y si tiene errores, llema el objeto errors.
    setErrors(
      validationData({
        ...inputValue,
        [inputClient.target.name]: inputClient.target.value,
      })
    );
    console.log(inputValue);
  };

  //*EFFECT
  //Renderiza la action getTemperamets (y trae los temperaments) cada que se inicie el Componente y cada que dispatch se actualice.
  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  //*TEMPERAMENT (pueden haber varios):
  //Toma el inputClient (del temperament) y verifica que en inputValue no este el temperament repetido.
  const handleSelect = (inputClient) => {
    //Tomamos el temperament seleccionado como value.
    const { value } = inputClient.target;

    //Si no esta repetido, lo agrega a la var inputValue en la parte de temperament.
    if (!inputValue.temperament.includes(value)) {
      //Dejamos los otros inputValue.temperament, en temperament dejamos los que ya estaban y agregamos el nuevo value.
      setInputValue({
        ...inputValue,
        temperament: [...inputValue.temperament, value],
      });
    } else {
      //Si ya está escogido, ponemos un alert.
      alert('This temperament is already chosen.');
    }
    console.log(inputValue.temperament);
  };

  //*BORRAR UN TEMPERAMENT ESCOGIDO:
  const handleErase = (temp) => {
    //Vamos dentro de inputValue y filtramos todos los temperaments, dejamos los que no sean borrados (temp).
    setInputValue({
      ...inputValue,
      temperament: inputValue.temperament.filter((d) => d !== temp),
    });
  };

  //*SUBMIT
  const handleSubmit = (e) => {
    //Prevenimos que se puedan submitear los valores de inputValue por default.
    e.preventDefault();
    //Despachamos la action POST con el valor del inputValue. El action toma a inputValue como "data" JSON.
    dispatch(postDog(inputValue));
    //Confirmamos la creación.
    alert('The dog was created successfully.');

    // Vaciamos a inputValue.

    setInputValue({
      name: '',
      minimun_height: 0,
      maximun_height: 0,
      minimun_weight: 0,
      maximun_weight: 0,
      lifespan: 0,
      temperament: [],
    });

    //Volvemos a home.
    history.push('/home');
  };

  return (
    <div className={style.all_container}>
      {/* TITLE */}
      <div className={style.form_nav}>
        <div className={style.form_title}>
          <h1>LET'S CREATE A NEW DOG!</h1>
          <h4>Please fill all the information.</h4>
        </div>
        <Link to='/home'>
          <button className={style.form_home_button}>Go Back!</button>
        </Link>
      </div>

      {/* Container  */}
      <div className={style.form_card_container}>
        {/* Le damos el handleSubmit al form */}
        <form
          className={style.form_description}
          onSubmit={(e) => handleSubmit(e)}
        >
          {/* Debe haber una doble relación, por eso value es inputValue (a pesar de asignarlo con useEffect) */}
          {/* NAME */}
          <div className={style.item_container}>
            <h3>Name:</h3>
            <input
              required
              className={style.item_input_name}
              type='text'
              value={inputValue.name}
              name='name'
              onChange={(e) => handleChange(e)}
            />
          </div>
          {/* Weight */}
          <div className={style.weight_container}>
            {/* - WEIGHT */}
            <div className={style.item_container}>
              <h3>Minumin Weight (kg): </h3>
              <input
                min='0'
                className={style.item_input}
                type='number'
                value={inputValue.minimun_weight}
                name='minimun_weight'
                onChange={(e) => handleChange(e)}
              />
            </div>

            {/* + WEIGHT */}
            <div className={style.item_container}>
              <h3>Maximun Weight (kg): </h3>
              <input
                min='0'
                className={style.item_input}
                type='number'
                value={inputValue.maximun_weight}
                name='maximun_weight'
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          {/* Height */}
          <div className={style.height_container}>
            {/* + HEIGHT */}
            <div className={style.item_container}>
              <h3>Minumin Height (cm):</h3>
              <input
                min='0'
                className={style.item_input}
                type='number'
                value={inputValue.minimun_height}
                name='minimun_height'
                onChange={(e) => handleChange(e)}
              />
            </div>

            {/* - HEIGHT */}
            <div className={style.item_container}>
              <h3>Maximun Height (cm):</h3>
              <input
                min='0'
                className={style.item_input}
                type='number'
                value={inputValue.maximun_height}
                name='maximun_height'
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          {/* TEMP AND LIFESPAN */}
          <div className={style.tyl_big_container}>
            <div className={style.tyl_container}>
              {/* TEMPERAMENTS */}
              <div className={style.item_container}>
                <h3>Temperaments: </h3>
                <select
                  defaultValue='all'
                  className={style.item_input}
                  onChange={handleSelect}
                >
                  <option value='all' disabled>
                    Choose a temperament.
                  </option>
                  {/* Mapeamos a los temperaments, mostrar las opciones */}
                  {allTemperaments.map((temp) => {
                    return (
                      <option
                        value={temp.name}
                        key={temp.id}
                        className={style.item_option}
                      >
                        {temp.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* LIFESPAN */}
              <div className={style.item_container}>
                <h3>Lifespan (years):</h3>
                <input
                  min='0'
                  className={style.item_input}
                  type='number'
                  value={inputValue.lifespan}
                  name='lifespan'
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>

            {/* SHOW TEMPERAMENTS
            Mostramos los temperaments agregados */}
            <div className={style.temps_container}>
              {inputValue.temperament.map((temp, i) => {
                return (
                  <div key={i++} className={style.temp_item}>
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
          </div>

          {/* BUTTON CREATE
          Si existe errors && alguno de los siguientes errores, no mostramos el botón.*/}
          {/* Si no hay errores, dejamos publicarlo. 
        Recuerda: errors es el estado que guarda los errores.*/}
          {console.log(errors)}
          {errors &&
          (errors.name ||
            errors.name2 ||
            errors.minimun_height ||
            errors.maximun_height ||
            errors.minimun_weight ||
            errors.maximun_weight ||
            errors.lifespan ||
            errors.biggerh ||
            errors.biggerw ||
            errors.temperament_lenght ||
            //Si los valores son 0 o menores.
            !inputValue.name.length ||
            inputValue.minimun_height <= 0 ||
            inputValue.maximun_height <= 0 ||
            inputValue.minimun_weight <= 0 ||
            inputValue.maximun_weight <= 0 ||
            inputValue.lifespan <= 0 ||
            //Si lno hay temperaments
            !inputValue.temperament.length) ? (
            <div className={style.progress}>
              Dog creation is still in progress (errors found).
            </div>
          ) : (
            <button className={style.form_button} type='submit'>
              Create Doggy!
            </button>
          )}
        </form>

        <div className={style.all_error_container}>
          {/* ERRORES: */}
          {/* Usamos los nombres con los que se guardan en el objeto errorContainer. */}
          {/* Si, el objeto errors (del useState) guarda un error con el nombre puesto en validation, se muestra el <p> con el mensaje (que contiene el objeto - error)*/}
          <div className={style.error_container}>
            <div>
              {/* Hacemos que las cosas se muestren por medio de la condicion &&. EJ: Si existe este error && se muesta este mensaje. */}
              <div className={style.error_title_container}>
                {(Object.keys(errors).length > 0 ||
                  !inputValue.temperament.length) && <h2> Control Panel </h2>}
                {(Object.keys(errors).length > 0 ||
                  !inputValue.temperament.length) && (
                  <p>Please have in mind:</p>
                )}
                {/* BUG: Si se seleciona de una, se muestra. */}
                {Object.keys(errors).length < 1 &&
                inputValue.temperament.length ? (
                  <h2> Everything looks good </h2>
                ) : null}
              </div>

              <div className={style.error_item_container}>
                {/* El && es un condicional. 
                    EJ: Si existe este error && se muestra esto. */}
                <div>{errors.name && <p>❕ {errors.name} </p>}</div>
                <div>{errors.name2 && <p>❕ {errors.name2} </p>}</div>
                {/* Only Contain Numbers */}
                <div>
                  {errors.minimun_height && <p>❕ {errors.minimun_height} </p>}
                </div>
                <div>
                  {errors.maximun_height && <p>❕ {errors.maximun_height} </p>}
                </div>
                <div>
                  {errors.minimun_weight && <p>❕ {errors.minimun_weight} </p>}
                </div>
                <div>
                  {errors.maximun_weight && <p>❕ {errors.maximun_weight} </p>}
                </div>
                {/* Cannot be 0 */}
                <div>
                  {errors.minimun_height0 && (
                    <p>❕ {errors.minimun_height0} </p>
                  )}
                </div>
                <div>
                  {errors.maximun_height0 && (
                    <p>❕ {errors.maximun_height0} </p>
                  )}
                </div>
                <div>
                  {errors.minimun_weight0 && (
                    <p>❕ {errors.minimun_weight0} </p>
                  )}
                </div>
                <div>
                  {errors.maximun_weight0 && (
                    <p>❕ {errors.maximun_weight0} </p>
                  )}
                </div>
                {/* + BIGGER -  */}
                <div>{errors.biggerh && <p>❕ {errors.biggerh} </p>}</div>
                <div>{errors.biggerw && <p>❕ {errors.biggerw} </p>}</div>
                {/* LIFESPAN */}
                <div>{errors.lifespan && <p>❕ {errors.lifespan} </p>}</div>
                {/* Lo hacemos manual. Si en el objeto de respuesta del user no hay temp, mostramos el mensaje. */}
                <div>
                  {!inputValue.temperament.length && (
                    <p>❕ You must select at least one temperament. </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
