const PokeApiService = require('../services/PokeApiService');
const WebhookService = require('../services/WebhookService');

module.exports = {
  key: 'BattleCreation',
  async handle({ data }) {
    const webhookService = new WebhookService();
    const pokeApiService = new PokeApiService();

    const resolvedBattle = await pokeApiService.resolveBattle(data.createdBattle);

    await webhookService.sendBattleToWebhook(resolvedBattle);
  },
};
