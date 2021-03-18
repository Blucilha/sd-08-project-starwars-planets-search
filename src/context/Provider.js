import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './index';
import { filterOptions } from '../services';

function Provider({ children }) {
  const [filters, setFilters] = useState([...filterOptions]);
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState(
    { filterByName: { name: '' } },
    { filterByNumericValues: [] },
  );
  const context = {
    data,
    setData,
    headers,
    setHeaders,
    filter,
    setFilter,
    filters,
    setFilters,
    filteredData,
    setFilteredData,
  };

  useEffect(() => {
    const fetchPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((res) => res.json());
      const formatData = results.reduce((planets, next) => {
        delete next.residents;
        return [...planets, next];
      }, []);
      setData(formatData);
      setHeaders(Object.keys(formatData[0]));
      setFilteredData(formatData);
    };
    fetchPlanets();
  }, [setData, setHeaders, setFilteredData]);

  useEffect(() => {
    const { filterByName, filterByNumericValues } = filter;
    if (filterByNumericValues) {
      setFilteredData(data.filter((planets) => planets.name
        .includes(filterByName.name))
        .filter((filtPlanets) => filterByNumericValues
          .every((planet) => {
            if (planet.comparison === 'maior que') {
              return parseInt(filtPlanets[planet.column], 10)
          > parseInt(planet.value, 10);
            }
            if (planet.comparison === 'menor que') {
              return parseInt(filtPlanets[planet.column], 10)
          < parseInt(planet.value, 10);
            }
            return parseInt(filtPlanets[planet.column], 10)
        === parseInt(planet.value, 10);
          })));
    } else {
      setFilteredData(data.filter((planets) => planets.name
        .includes(filterByName.name)));
    }
  }, [setFilteredData, filter, data]);

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
