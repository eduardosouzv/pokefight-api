const axios = require('axios');

const Battle = require('../models/Battle');

const getPokemonsInformations = require('../tools/getPokemonsInformations');

module.exports = {
  key: 'BattleCreation',
  async handle({ data }) {
    const [defiant_info, opponent_info] = await getPokemonsInformations([data.defiant, data.opponent]);

    const createdBattle = await Battle.create({
      defiant_name: defiant_info.name,
      opponent_name: opponent_info.name,
      winner: Math.round(Math.random()) ? defiant_info.name : opponent_info.name,
    });

    await axios.post(process.env.WEBHOOK_LINK, {
      battle_id: createdBattle.id,
      winner: createdBattle.winner,
      defiant_info,
      opponent_info,
    });
  },
};
