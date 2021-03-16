import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './Context';
import getApi from '../services/apiRequest';

const Provider = ({ children }) => {
  const [dataApi, setDataApi] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getApi().then((result) => {
      setDataApi(result);
      setLoading(false);
    });
  }, []);
  const data = { dataApi, loading };
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
