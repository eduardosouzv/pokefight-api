const PokeApiClient = require('../clients/PokeApiClient');
const WebhookClient = require('../clients/WebhookClient');

const Battle = require('../models/Battle');

class WebhookService {
  async resolveBattle(createdBattle) {
    try {
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
    } catch (error) {
      await Battle.update({ status: 'ERROR' }, { where: { id: createdBattle.id } });
      this.sendErrorMessage();
    }
  }

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
