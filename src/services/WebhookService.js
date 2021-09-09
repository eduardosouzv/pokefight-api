const WebhookClient = require('../clients/WebhookClient');

class WebhookService {
  async sendBattleToWebhook(battle) {
    const webhookClient = new WebhookClient();

    await webhookClient.send(battle);
  }

  async sendErrorMessage(battleId) {
    const webhookClient = new WebhookClient();

    await webhookClient.send({ battleId, message: 'an error occurred in the battle' });
  }
}

module.exports = WebhookService;
