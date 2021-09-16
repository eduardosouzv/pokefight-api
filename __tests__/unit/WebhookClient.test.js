jest.mock('axios');

const axios = require('axios');
const WebhookClient = require('../../src/clients/WebhookClient');

describe('WebhookClient', () => {
  const webhookClient = new WebhookClient();

  it('should make a POST', async () => {
    let spy = jest.spyOn(axios, 'post');
    axios.post.mockResolvedValueOnce();

    await webhookClient.send('test message');

    expect(spy).toBeCalledTimes(1);
  });
});
