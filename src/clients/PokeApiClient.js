const axios = require('axios');

class PokeApiClient {
  async getPokemonInformation(pokemon) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    return response.data;
  }
}

module.exports = PokeApiClient;
