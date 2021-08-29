const Queue = require('../lib/Queue');

const Battle = require('../models/Battle');

const getPokemonsInformations = require('../tools/getPokemonsInformations');

module.exports = {
  async create(req, res) {
    const { defiant, opponent } = req.body;

    if (!defiant || !opponent) return res.status(400).json({ message: 'Missing pokemon names.' });

    await Queue.add('BattleCreation', { defiant, opponent });

    res.status(201).json({ message: 'Battle created.' });
  },

  async show(req, res) {
    const { id } = req.params;

    if (isNaN(id)) return res.status(400).json({ message: 'Wrong param format.' });

    const pokemonBattleFound = await Battle.findByPk(id);

    if (!pokemonBattleFound) {
      return res.status(404).json({ message: `Battle id ${id} not found.` });
    }

    const { defiant_name, opponent_name, winner } = pokemonBattleFound;

    const [defiant_info, opponent_info] = await getPokemonsInformations([defiant_name, opponent_name]);

    res.json({
      battle_id: id,
      winner,
      defiant_info,
      opponent_info,
    });
  },

  async index(req, res) {
    const allBattles = await Battle.findAll();

    res.json(allBattles || []);
  },
};
