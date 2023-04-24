//Standard Imports.
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
//Actions.
import { getDogName } from '../../redux/actions/actions';
//CSS.
import style from './SearchBar.module.css';

export default function SearchBar({ paginado }) {
  const dispatch = useDispatch();
  const [searchDog, setSearchDog] = useState('');
  const history = useHistory();

  const handleInput = (e) => {
    e.preventDefault();
    setSearchDog(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchDog) dispatch(getDogName(searchDog));
    setSearchDog('');
    history.push('/home');
    paginado(1);
  };

  return (
    <div className={style.searchbar_container}>
      <form className={style.form}>
        <input
          className={style.searchbar}
          type='text'
          onChange={(e) => handleInput(e)}
          value={searchDog}
          placeholder='Search...'
        />
        <button
          className={style.searchbar_button}
          type='submit'
          onClick={(e) => handleSubmit(e)}
        >
          Look for
        </button>
      </form>
    </div>
  );
}
