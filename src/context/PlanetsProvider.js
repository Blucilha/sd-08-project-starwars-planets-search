import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import fetchPlanets from '../services/getPlanets';

const filterPlanets = {
  filterByName: {
    name: '',
  },
};

const arrOptions = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [selectColumns, setSelectColumns] = useState(arrOptions);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState(filterPlanets);
  const [numFilter, setNumFilter] = useState([]);

  console.log(numFilter);

  useEffect(() => {
    const getPlanets = async () => {
      const starWarsPlanets = await fetchPlanets();
      setData(starWarsPlanets);
      setIsLoading(true);
    };
    getPlanets();
  }, []);

  useEffect(() => {
    const { filterByName: { name } } = filters;
    const filtered = data.filter((item) => item.name.includes(name));
    setPlanets(filtered);
    if (selectColumns === undefined) {
      setSelectColumns(arrOptions);
    }
  }, [data, filters, selectColumns]);

  // const filterArrOptions = () => numFilter
  //   .forEach(({ comparison, column, value }) => setSelectColumns(selectColumns
  //     .filter((item) => item !== column)));

  useEffect(() => {
    numFilter.forEach(({ comparison, column, value }) => {
      if (comparison === 'igual a') {
        return setPlanets(data.filter((item) => +item[column] === +value));
      } if (comparison === 'maior que') {
        return setPlanets(data.filter((item) => +item[column] > +value));
      } if (comparison === 'menor que') {
        return setPlanets(data.filter((item) => +item[column] < +value));
      }
    });
  },
  [data, numFilter, selectColumns]);

  // useEffect(() => {
  //   filterArrOptions();
  // }, [filterArrOptions]);

  const value = {
    data,
    planets,
    isLoading,
    filters,
    setFilters,
    setNumFilter,
    numFilter,
    selectColumns,
    // filterArrOptions,
  };

  return (
    <PlanetContext.Provider value={ value }>
      {children}
    </PlanetContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
