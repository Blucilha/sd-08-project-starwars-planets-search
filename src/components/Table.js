import React, { useContext } from 'react';
import StarContext from '../context/StarContext';

const Table = () => {
  const {
    listPlanet, filterName, handleChange,
  } = useContext(StarContext);
  const filteredPlanets = listPlanet.filter(
    (planet) => planet.name.toLowerCase().includes(filterName.toLowerCase()),
  );

  return (
    <div>
      <input type="text" data-testid="name-filter" onChange={ handleChange } />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotarion Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>

          {
            filteredPlanets
              .map((planet) => (
                <tr key={ planet.name }>
                  <td>{planet.name}</td>
                  <td>{planet.rotation_period}</td>
                  <td>{planet.orbital_period}</td>
                  <td>{planet.diameter}</td>
                  <td>{planet.climate}</td>
                  <td>{planet.gravity}</td>
                  <td>{planet.terrain}</td>
                  <td>{planet.surface_water}</td>
                  <td>{planet.population}</td>
                  <td>{planet.films}</td>
                  <td>{planet.created}</td>
                  <td>{planet.edited}</td>
                  <td>{planet.url}</td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default Table;
