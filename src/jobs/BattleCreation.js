const WebhookService = require('../services/WebhookService');

module.exports = {
  key: 'BattleCreation',
  async handle({ data }) {
    const webhookService = new WebhookService();
    const resolvedBattle = await webhookService.resolveBattle(data.createdBattle);

    await webhookService.sendBattleToWebhook(resolvedBattle);
  },
};
