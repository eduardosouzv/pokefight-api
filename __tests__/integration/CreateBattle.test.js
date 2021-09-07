const request = require('supertest');

const Battle = require('../../src/models/Battle');

const app = require('../../src/app');

jest.mock('../../src/lib/Queue', () => {
  return {
    add: jest.fn().mockResolvedValue(),
    queues: [],
  };
});

describe('Battle Creation', () => {
  beforeEach(async () => {
    await Battle.destroy({ truncate: true, force: true, restartIdentity: true });
  });

  it('should create a battle with status PENDING', async () => {
    const response = await request(app).post('/pokemon/create').send({
      defiant: 'pikachu',
      opponent: 'abra',
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      battle_id: 1,
      defiant_name: 'pikachu',
      opponent_name: 'abra',
      status: 'PENDING',
    });
  });
});
