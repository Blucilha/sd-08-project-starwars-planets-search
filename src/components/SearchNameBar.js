import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function SearchNameBar() {
  const { searchName, setSearchName, setName, filteredData } = useContext(StarWarsContext);
  const handleChange = ({ target }) => {
    setSearchName(target.value);
  };

  // setName(searchName);
  console.log(filteredData);
  return (
    <div>
      <label htmlFor="text" data-testid="text-input-label">
        Inclui o texto no nome:
        <input
          data-testid="text-input"
          type="text"
          name="searchName"
          onChange={(e)=> setName(e.target.value)}
        />
      </label>
    </div>
  );
}

export default SearchNameBar;
