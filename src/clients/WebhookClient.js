const axios = require('axios');

class WebhookClient {
  async send(message) {
    return await axios.post(process.env.WEBHOOK_LINK, message);
  }
}

module.exports = WebhookClient;
