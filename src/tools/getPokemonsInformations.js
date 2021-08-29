const axios = require('axios');

/**
 *
 * @param {Array} pokemons - Array of defiant name(or id) and opponent name(or id).
 * @returns {Promise} Promise that return an array of objects with name, abilities and types about each pokemon.
 */
module.exports = async pokemons => {
  return (
    await Promise.all(
      pokemons.map(async pokemon => {
        return await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      })
    )
  ).map(pokemon => ({
    name: pokemon.data.name,
    abilities: pokemon.data.abilities,
    types: pokemon.data.types,
  }));
};
