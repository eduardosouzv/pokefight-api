jest.mock('../../src/clients/WebhookClient');

const WebhookClient = require('../../src/clients/WebhookClient');
const WebhookService = require('../../src/services/WebhookService');

describe('WebhookService', () => {
  const webhookService = new WebhookService();

  it('should send a battle to webhook', async () => {
    const resolvedBattle = {
      id: 1,
      winner: 'pikachu',
      defiant_info: {
        name: 'pikachu',
        abilities: [],
        types: [],
      },
      opponent_info: {
        name: 'gligar',
        abilities: [],
        types: [],
      },
    };

    await webhookService.sendBattleToWebhook(resolvedBattle);

    expect(WebhookClient).toHaveBeenCalledTimes(1);
  });

  it('should send an webhook with error message and id of battle that error occurred', async () => {
    await webhookService.sendErrorMessage(1);

    expect(WebhookClient).toHaveBeenCalledTimes(1);
  });
});
