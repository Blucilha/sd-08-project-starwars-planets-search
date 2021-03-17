const PLANET_API = 'https://swapi.dev/api/planets/';

export const getPlanetsList = () => (
  fetch(PLANET_API)
    .then((response) => response.json())
    .then((json) => Promise.resolve(json.results))
    .catch((error) => Promise.reject(error.message))
);

export default getPlanetsList;