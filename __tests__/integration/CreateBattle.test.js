jest.mock('../../src/lib/Queue', () => {
  return {
    add: jest.fn().mockResolvedValue(),
    queues: [],
  };
});

const request = require('supertest');

const app = require('../../src/app');
const Queue = require('../../src/lib/Queue');

describe('Battle Creation', () => {
  it('should create a battle with status PENDING', async () => {
    const response = await request(app).post('/pokemon/create').send({
      defiant: 'pikachu',
      opponent: 'abra',
    });

    expect(Queue.add).toBeCalledTimes(1);
    expect(Queue.add).toBeCalledWith('BattleCreation', {
      createdBattle: expect.objectContaining({
        id: expect.any(Number),
        defiant_name: 'pikachu',
        opponent_name: 'abra',
        status: 'PENDING',
        winner: null,
      }),
    });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      battle_id: expect.any(Number),
      defiant_name: 'pikachu',
      opponent_name: 'abra',
      status: 'PENDING',
    });
  });
});
