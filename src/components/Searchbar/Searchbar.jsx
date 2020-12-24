import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './Searchbar.module.css';

function Searchbar({ onHandleSubmit}) {

  const [query, setQuery] = useState('');

  const onSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      return toast.error('No-no! Dont joke with me! Enter something interesting!');
    }
    onHandleSubmit(query);
    setQuery('');
}




  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={onSubmit}>
         <button type="submit" className={s.SearchForm__button}>
            <span className={s.SearchForm__buttonLabel}>Search</span>
         </button>

    <input
      className={s.SearchForm__input}
      type="text"
      autoComplete="off"
      autoFocus
      value={query}
     onChange={({ target }) => setQuery(target.value)}
      placeholder="Search images and photos"
    />
  </form>
</header>
  );
}

Searchbar.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
 };

export default Searchbar;