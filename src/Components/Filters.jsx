import React, { useContext, useState } from 'react';
import StarWarsContext from '../Contexts/StarWars/StarWarsContext';

const Filters = () => {
  const { filters:
    { filterByName: { name },
      filterByNumericValues },
  setName,
  setFiltersByNumericValues,
  } = useContext(StarWarsContext);

  const columns = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];
  const comparisons = ['maior que', 'menor que', 'igual a'];

  const [column, setColumn] = useState(columns[0]);
  const [comparison, setComparison] = useState(comparisons[0]);
  const [value, setValue] = useState('');

  return (
    <>
      <input
        value={ name }
        data-testid="name-filter"
        onChange={ ({ target: { value: v } }) => setName(v) }
      />

      <select
        data-testid="column-filter"
        onChange={ ({ target: { value: v } }) => setColumn(v) }
      >
        {filterByNumericValues.reduce((acc, filter) => acc
          .filter((c) => c !== filter.column), columns)
          .map((c, i) => <option value={ c } key={ i }>{c}</option>)}
      </select>

      <select
        data-testid="comparison-filter"
        onChange={ ({ target: { value: v } }) => setComparison(v) }
      >
        {comparisons.map((c, i) => <option value={ c } key={ i }>{c}</option>)}
      </select>

      <input
        data-testid="value-filter"
        onChange={ ({ target: { value: v } }) => setValue(v) }
      />

      <button
        type="button"
        data-testid="button-filter"
        disabled={ !value }
        onClick={ () => {
          setFiltersByNumericValues([...filterByNumericValues,
            { column, comparison, value }]);
          setColumn(filterByNumericValues.reduce((acc, filter) => acc
            .filter((c) => c !== filter.column), columns));
        } }
      >
        filter
      </button>
    </>
  );
};

export default Filters;