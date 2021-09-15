const request = require('supertest');
const app = require('../../src/app');
const Queue = require('../../src/lib/Queue');

describe('Show battle by id', () => {
  afterEach(async () => {
    await Queue.close();
  });

  it('should return battle with id 1', async () => {
    const response = await request(app).get('/pokemon/show/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        battle_id: 1,
        defiant_info: expect.any(Object),
        opponent_info: expect.any(Object),
        winner: 'squirtle',
      })
    );
  });
});
