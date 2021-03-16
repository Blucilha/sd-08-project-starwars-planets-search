import React, { createContext, useEffect, useState } from 'react';

import PropTypes from 'prop-types';

export const PlanetsContext = createContext([]);

const PlanetsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    const getStarWarsPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((res) => res.json());
      setPlanets(results);
      setFilteredPlanets(results);
    };
    getStarWarsPlanets();
  }, []);

  const filterPlanetsByName = (text) => {
    const filtered = planets.filter(
      ({ name }) => name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredPlanets(filtered);
  };

  const filterPlanetsByValue = ({ column, comparison, value }) => {
    const newFilteredPlanets = planets.filter((planet) => {
      // console.log(comparison);
      const targetInfo = planet[column];
      if (comparison === 'menor que') {
        return targetInfo <= value;
      }
      if (comparison === 'maior que') {
        return targetInfo >= value;
      }
      return targetInfo === value;
    });
    setFilteredPlanets(newFilteredPlanets);
  };

  const context = {
    planets,
    filteredPlanets,
    filterByName: (text) => filterPlanetsByName(text),
    filterByValue: (filterInfos) => filterPlanetsByValue(filterInfos),
  };

  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
};

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
