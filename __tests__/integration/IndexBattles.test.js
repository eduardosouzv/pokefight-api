const request = require('supertest');

const app = require('../../src/app');
const Queue = require('../../src/lib/Queue');

describe('Find all battles', () => {
  afterEach(async () => {
    await Queue.close();
  });

  it('should index all battles in database', async () => {
    const response = await request(app).get('/pokemon/index');

    expect(response.status).toBe(200);

    console.log(response.body);
    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(Number),
          defiant_name: 'bulbasaur',
          opponent_name: 'squirtle',
          winner: 'squirtle',
          status: 'FINISHED',
        },
        {
          id: expect.any(Number),
          defiant_name: 'ivysaur',
          opponent_name: 'charmander',
          winner: 'ivysaur',
          status: 'FINISHED',
        },
      ])
    );
  });
});
