import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './Context';
import getApi from '../services/apiRequest';

const Provider = ({ children }) => {
  const [dataApi, setDataApi] = useState([]);
  const [loading, setLoading] = useState(true);

  const filter = {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
      {
        column: 'population',
        comparison: 'maior que',
        value: '100000',
      },
    ],
  };

  const [filters, setFilters] = useState(filter);

  const setName = (name) => {
    setFilters((prevState) => ({
      ...prevState,
      filterByName: {
        name,
      },
    }));
  };

  useEffect(() => {
    getApi().then((result) => {
      setDataApi(result);
      setLoading(false);
    });
  }, []);

  const data = {
    dataApi,
    loading,
    setName,
    filters,
    setFilters,
  };
  return (
    <AppContext.Provider value={ data }>
      {children}
    </AppContext.Provider>
  );
};

export default Provider;

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};
