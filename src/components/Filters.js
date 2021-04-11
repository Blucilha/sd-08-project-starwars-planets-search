import React, { useContext } from 'react';
import StarWarsPlanetsContext from '../context/StarWarsPlanetsContext';
import NumericFilter from './NumericFilter';
import TextFilter from './TextFilter';
import removeX from '../images/x.jpg';

function Filters() {
  const {
    filters,
    setFilters,
  } = useContext(StarWarsPlanetsContext);

  const removeFilter = ({ target }) => {
    const { filterByNumericValues } = filters;
    const filterColumn = target.value;
    setFilters({
      ...filters,
      filterByNumericValues: filterByNumericValues
        .filter((filter) => filter.column === filterColumn),
    });
  };

  return (
    <div className="filters">
      <div className="filters-input">
        <TextFilter />
        <NumericFilter />
      </div>
      <div className="selected-filters">
        {filters.filterByNumericValues.map((filter) => (
          <div
            key={ filter }
            data-testid="filter"
          >
            <button
              type="button"
              value={ filter.column }
              onClick={ removeFilter }
            >
              <p>X</p>
              <img
                className="remove-x"
                alt="botão de remover filtro"
                src={ removeX }
              />
              <p>{filter.column}</p>
              <p>{filter.comparison}</p>
              <p>{filter.value}</p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filters;
