import React, { useEffect, useState } from 'react';
import StarWarsContext from './StarWarsContext';
import GetPlanets from '../services';

function Provider({ children }) {
  const [data, setDate] = useState([]);
  const [name, setName] = useState('');
  const [isLoading, setLoading] = useState(true);

  const setConsumer = () => ({
    data,
    isLoading,
    filters: {
      filterByName: {
        name,
      },
    },
    setName,
  });

  useEffect(() => {
    GetPlanets().then((response) => {
      setDate(response);
      setLoading(false);
    });
  }, []);

  return (
    <StarWarsContext.Provider value={ setConsumer() }>
      { children }
    </StarWarsContext.Provider>
  );
}

export default Provider;
