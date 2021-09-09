const PokeApiClient = require('../clients/PokeApiClient');
const Queue = require('../lib/Queue');
const Battle = require('../models/Battle');

class PokeApiService {
  async createBattle({ defiant_name, opponent_name }) {
    const createdBattle = await Battle.create({
      defiant_name,
      opponent_name,
      status: 'PENDING',
    });

    await Queue.add('BattleCreation', { createdBattle });

    return createdBattle;
  }

  async findOneBattle(id) {
    const pokeApiClient = new PokeApiClient();
    const pokemonBattleFound = await Battle.findByPk(id);

    if (!pokemonBattleFound) {
      return;
    }

    const { defiant_name, opponent_name, winner } = pokemonBattleFound;

    const [defiant_info, opponent_info] = (
      await Promise.all([defiant_name, opponent_name].map(pokemon => pokeApiClient.getPokemonInformation(pokemon)))
    ).map(pokemon => ({
      name: pokemon.name,
      abilities: pokemon.abilities,
      types: pokemon.types,
    }));

    return {
      battle_id: id,
      winner,
      defiant_info,
      opponent_info,
    };
  }

  async findAll() {
    const allBattles = await Battle.findAll();

    if (!allBattles.length) {
      return [];
    }

    return allBattles;
  }

  async resolveBattle(createdBattle) {
    const pokeApiClient = new PokeApiClient();

    const { id, defiant_name, opponent_name } = createdBattle;

    const [defiant_info, opponent_info] = (
      await Promise.all([defiant_name, opponent_name].map(pokemon => pokeApiClient.getPokemonInformation(pokemon)))
    ).map(pokemon => ({
      name: pokemon.name,
      abilities: pokemon.abilities,
      types: pokemon.types,
    }));

    const winner = Math.round(Math.random()) ? defiant_name : opponent_name;

    await Battle.update({ winner, status: 'FINISHED' }, { where: { id } });

    return {
      id,
      winner,
      defiant_info,
      opponent_info,
    };
  }

  async updateBattleIfOccurrateAnError(createdBattleId) {
    await Battle.update({ status: 'ERROR' }, { where: { id: createdBattleId } });
  }
}

module.exports = PokeApiService;
