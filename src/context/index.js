import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [data, setData] = useState();

  const handleData = async () => {
    const result = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((res) => res.json())
      .then((apiData) => apiData.results)
      .catch((err) => console.log(err));
    setData(result);
  };

  const obj = {
    dataObject: { value: data, set: handleData },
  };

  return (
    <Context.Provider value={ obj }>
      { children }
    </Context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ContextProvider;
