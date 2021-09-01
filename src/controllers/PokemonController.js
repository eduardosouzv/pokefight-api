const PokeApiService = require('../services/PokeApiService');

module.exports = {
  async create(req, res) {
    const { defiant, opponent } = req.body;

    const { id, defiant_name, opponent_name, status } = await new PokeApiService().createBattle({
      defiant_name: defiant.toLowerCase(),
      opponent_name: opponent.toLowerCase(),
    });

    res.status(201).json({
      battle_id: id,
      defiant_name,
      opponent_name,
      status,
    });
  },

  async show(req, res) {
    const { id } = req.params;

    const foundBattle = await new PokeApiService().findOneBattle(id);

    if (!foundBattle) {
      return res.status(404).json({
        message: `Battle id ${id} not found.`,
      });
    }

    res.json(foundBattle);
  },

  async index(req, res) {
    const allBattles = await new PokeApiService().findAll();

    if (!allBattles.length) {
      return res.status(200).json([]);
    }

    res.json(allBattles);
  },
};
