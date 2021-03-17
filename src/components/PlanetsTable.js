import React, { useContext } from 'react';
import Context from '../context/Context';

import '../styles/PlanetsTable.css';

function PlanetsTable() {
  const { isFetching, data, filters } = useContext(Context);

  const dataAfterNameFilter = data
    .filter((planetData) => planetData.name.includes(filters.filterByName.name));

  const dataAfterNumericFilter = filters.filterByNumericValues.reduce((acc, filter) => {
    const { comparison, column, value } = filter;
    const comparisonFunctions = {
      'maior que': (columnData) => parseInt(columnData, 10) > parseInt(value, 10),
      'menor que': (columnData) => parseInt(columnData, 10) < parseInt(value, 10),
      'igual a': (columnData) => parseInt(columnData, 10) === parseInt(value, 10),
    };
    return acc
      .filter((planetData) => comparisonFunctions[comparison](planetData[column]));
  }, dataAfterNameFilter);

  const renderData = dataAfterNumericFilter.map((planetData) => Object.entries(planetData)
    .filter((planetInfo) => planetInfo[0] !== 'residents'));

  return (
    isFetching
      ? 'Carregando'
      : (
        <table>
          <thead>
            <tr>
              { Object.keys(data[0]).filter((key) => key !== 'residents').map(
                (dataHeadColumn) => <th key={ dataHeadColumn }>{ dataHeadColumn }</th>,
              ) }
            </tr>
          </thead>
          <tbody>
            { renderData.map((dataBodyRow, indexR) => (
              <tr key={ indexR }>
                { dataBodyRow.map((dataBodyColumn, indexC) => (
                  <td key={ indexC }>{ dataBodyColumn[1] }</td>
                ))}
              </tr>))}
          </tbody>
        </table>
      )
  );
}

export default PlanetsTable;
