const PokeApiClient = require('../clients/PokeApiClient');
const WebhookClient = require('../clients/WebhookClient');

const Battle = require('../models/Battle');

class WebhookService {
  async sendBattleToWebhook(battle) {
    const webhookClient = new WebhookClient();

    await webhookClient.send(battle);
  }

  async sendErrorMessage() {
    const webhookClient = new WebhookClient();

    await webhookClient.send({ message: 'an error occurred in the battle' });
  }
}

module.exports = WebhookService;
