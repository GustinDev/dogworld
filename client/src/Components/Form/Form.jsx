//Standard - New
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
//Actions
import { postDog, getTemperaments } from '../../redux/actions/actions';
//CSS

//Validamos la data ingresada.

//*FORM

export default function Form() {
  const dispatch = useDispatch();
  const history = useHistory();

  const allTemperaments = useSelector((state) => state.temperaments);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  //*CAMBIOS EN INPUT - INGRESO DE DATA

  //*EFFECT

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  //*TEMPERAMENT (pueden haber varios):

  const handleSelect = (event) => {
    const selectedTemperament = event.target.value;
    const currentTemperaments = getValues('temperament') || [];
    const updatedTemperaments = [...currentTemperaments, selectedTemperament];
    setValue('temperament', updatedTemperaments, { shouldDirty: true });
  };

  const formData = watch();
  console.log(formData);

  //* TEMPERAMENT

  //*SUBMIT

  const onSubmit = (data) => {
    const formData = {
      ...data,
      temperament: Array.isArray(data.temperament)
        ? data.temperament
        : [data.temperament],
    };
    console.log(formData);
    dispatch(postDog(formData));
    alert('The dog was created successfully.');
    history.push('/home');
  };

  return (
    <div className='flex justify-start items-center flex-col font-roboto w-[350px]  md:w-[700px] lg:w-[1000px] h-[650px] bg-backgroundf rounded-lg shadow-lightblue shadow-md'>
      <div className='flex flex-col md:flex-row  mt-10 md:w-[600px]  lg:w-[900px] justify-between align-center'>
        <div>
          <h1 className='text-[20px] md:text-[30px] lg:text-[50px] font-lilita text-backgroundw'>
            LET'S CREATE A NEW DOG!
          </h1>
          <h4 className='flex'>Please fill all the information.</h4>
        </div>
        <Link to='/home'>
          <button className='font-lilita inline-block cursor-pointer border-0 rounded-[10px] text-white bg-blue-500 text-[20px] leading-28 px-[20px] py-[10px] text-center tracking-wider hover:bg-hoverbtn shadow-md '>
            Go Back!
          </button>
        </Link>
      </div>

      <div className='flex flex-row '>
        <form
          className='flex flex-col justify-center md:justify-start items-center w-[350px] md:w-[500px] mt-5'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='w-[300px]  md:w-full flex items-start flex-col'>
            <h3 className='my-3 text-backgroundw'>Name:</h3>
            <input
              className=' w-[200px] md:w-[453px] h-[30px] outline-2 outline-outlinecolor rounded-lg border-2 border-outlinecolor text-medium bg-white  rounded-md px-2 py-2 font-roboto font-semibold'
              type='text'
              {...register('name', {
                required: 'This field is required.',
                pattern: {
                  value: /^[A-Za-z\s]+$/i,
                  message: 'Name should only contain letters and spaces.',
                },
              })}
            />
            {errors.name && <p className='text-start'>{errors.name.message}</p>}
          </div>

          <div className='flex w-[300px] md:w-[500px] flex-col md:flex-row'>
            <div className='flex  flex-col items-start  w-full'>
              <h3>Minimum Weight (kg):</h3>
              <input
                className='w-[200px] h-[30px] outline-2 outline-outlinecolor rounded-lg border-2 border-outlinecolor text-medium bg-white  rounded-md px-2 py-2 font-roboto font-semibold'
                type='number'
                {...register('minimun_weight', {
                  required: 'This field is required.',
                  min: {
                    value: 0.1,
                    message: 'Minimum weight must be greater than 0.',
                  },
                  pattern: {
                    value: /^\d+$/,
                    message: 'Please enter a valid number.',
                  },
                })}
              />
              {errors.minimun_weight && (
                <p className='text-start'>{errors.minimun_weight.message}</p>
              )}
            </div>

            <div className='flex flex-col items-start  w-full'>
              <h3>Maximum Weight (kg):</h3>
              <input
                className='w-[200px] h-[30px] outline-2 outline-outlinecolor rounded-lg border-2 border-outlinecolor text-medium bg-white  rounded-md px-2 py-2 font-roboto font-semibold'
                type='number'
                {...register('maximun_weight', {
                  required: 'This field is required.',
                  min: {
                    value: 0.1,
                    message: 'Maximum weight must be greater than 0.',
                  },
                  pattern: {
                    value: /^\d+$/,
                    message: 'Please enter a valid number.',
                  },
                  validate: {
                    lessThan: (value) =>
                      parseInt(value) >= parseInt(watch('minimun_weight')) ||
                      'Maximum weight must be greater than the minimum weight.',
                  },
                })}
              />
              {errors.maximun_weight && (
                <p className='text-start'>{errors.maximun_weight.message}</p>
              )}
            </div>
          </div>

          <div className='flex w-[300px] md:w-[500px] flex-col md:flex-row'>
            <div className='flex flex-col items-start  w-full'>
              <h3>Minimum Height (cm):</h3>
              <input
                className='w-[200px] h-[30px] outline-2 outline-outlinecolor rounded-lg border-2 border-outlinecolor text-medium bg-white  rounded-md px-2 py-2 font-roboto font-semibold'
                type='number'
                {...register('minimun_height', {
                  required: 'This field is required.',
                  min: {
                    value: 0.1,
                    message: 'Minimum height must be greater than 0.',
                  },
                  pattern: {
                    value: /^\d+$/,
                    message: 'Please enter a valid number.',
                  },
                })}
              />
              {errors.minimun_height && (
                <p className='text-start'>{errors.minimun_height.message}</p>
              )}
            </div>

            <div className='flex flex-col items-start  w-full'>
              <h3>Maximum Height (cm):</h3>
              <input
                className='w-[200px] h-[30px] outline-2 outline-outlinecolor rounded-lg border-2 border-outlinecolor text-medium bg-white  rounded-md px-2 py-2 font-roboto font-semibold'
                type='number'
                {...register('maximun_height', {
                  required: 'This field is required.',
                  min: {
                    value: 0.1,
                    message: 'Maximum height must be greater than 0.',
                  },
                  pattern: {
                    value: /^\d+$/,
                    message: 'Please enter a valid number.',
                  },
                  validate: {
                    lessThan: (value) =>
                      parseInt(value) >= parseInt(watch('minimun_height')) ||
                      'Maximum height must be greater than the minimum height.',
                  },
                })}
              />
              {errors.maximun_height && (
                <p className='text-start'>{errors.maximun_height.message}</p>
              )}
            </div>
          </div>

          <div>
            <div className='flex w-[300px] md:w-[500px] flex-col md:flex-row'>
              <div className='flex flex-col items-start  w-full'>
                <h3>Temperament: </h3>
                <select
                  onChange={handleSelect}
                  className='w-[200px] h-[30px] outline-2 outline-outlinecolor rounded-lg border-2 border-outlinecolor text-medium bg-white  rounded-md px-2 font-roboto font-semibold'
                  {...register('temperament', {
                    validate: {
                      required: (value) =>
                        value.length > 0 || 'Please choose a temperament.',
                    },
                  })}
                >
                  <option value='' disabled>
                    Choose a temperament.
                  </option>
                  {allTemperaments.map((temp) => (
                    <option
                      value={temp.name}
                      key={temp.id}
                      className='pl-4 font-bold text-md'
                    >
                      {temp.name}
                    </option>
                  ))}
                </select>
                {errors.temperament && (
                  <p className='text-start'>{errors.temperament.message}</p>
                )}
              </div>

              <div className='flex flex-col items-start  w-full'>
                <h3>Lifespan (years):</h3>
                <input
                  className='w-[200px] h-[30px] outline-2 outline-outlinecolor rounded-lg border-2 border-outlinecolor text-medium bg-white  rounded-md px-2 py-2 font-roboto font-semibold'
                  type='number'
                  {...register('lifespan', {
                    required: 'This field is required.',
                    min: {
                      value: 0.1,
                      message: 'Lifespan must be greater than 0.',
                    },
                    pattern: {
                      value: /^\d+$/,
                      message: 'Please enter a valid number.',
                    },
                  })}
                />
                {errors.lifespan && (
                  <p className='text-start'>{errors.lifespan.message}</p>
                )}
              </div>
            </div>
          </div>

          <button
            className='font-lilita inline-block cursor-pointer border-0 rounded-[10px] text-white bg-blue-500 text-[30px] leading-28 px-[20px] text-center tracking-wider hover:bg-hoverbtn shadow-md mt-4'
            type='submit'
          >
            Create Doggy!
          </button>
        </form>
      </div>
    </div>
  );
}
