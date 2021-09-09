const PokeApiService = require('../services/PokeApiService');
const WebhookService = require('../services/WebhookService');

module.exports = {
  key: 'BattleCreation',
  async handle({ data }) {
    try {
      const webhookService = new WebhookService();
      const pokeApiService = new PokeApiService();

      const resolvedBattle = await pokeApiService.resolveBattle(data.createdBattle);

      await webhookService.sendBattleToWebhook(resolvedBattle);
    } catch (error) {
      await new PokeApiService().updateBattleIfOccurrateAnError(data.createdBattle.id);
      await new WebhookService().sendErrorMessage(data.createdBattle.id);
    }
  },
};
