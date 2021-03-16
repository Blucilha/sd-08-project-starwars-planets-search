import React, { useState } from 'react';
import PropTypes from 'prop-types';
import tableContext from './tableContext';

export default function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [filters, setFilters] = useState(
    {
      filterByName: {
        name: '',
      },
    },
  );

  const context = {
    data,
    isFetching,
    filters,
    filteredData,
    setData,
    setIsFetching,
    setFilters,
    setFilteredData,
  };

  return (
    <div>
      <tableContext.Provider value={ context }>
        {children}
      </tableContext.Provider>
    </div>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
