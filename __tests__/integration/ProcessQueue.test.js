const axios = require('axios');
jest.mock('axios');

require('../../src/database');

const Queue = require('../../src/lib/Queue');

describe('Queue', () => {
  afterEach(async () => {
    await Queue.close();
  });
  beforeEach(() => {
    Queue.process();
  });

  it('should process the battles in queue', async () => {
    let spy = jest.spyOn(axios, 'post');
    axios.post.mockResolvedValueOnce();
    axios.get
      .mockResolvedValueOnce({
        data: {
          name: 'pikachu',
          abilities: [],
          types: [],
        },
      })
      .mockResolvedValueOnce({
        data: {
          name: 'abra',
          abilities: [],
          types: [],
        },
      });

    await Queue.add('BattleCreation', {
      createdBattle: {
        id: 1,
        defiant_name: 'pikachu',
        opponent_name: 'abra',
        status: 'PENDING',
        winner: null,
      },
    });

    await Queue.waitCompletion('BattleCreation');

    expect(spy).toBeCalled();
    expect(spy).toBeCalledWith(expect.any(String), {
      defiant_info: { abilities: [], name: 'pikachu', types: [] },
      id: 1,
      opponent_info: { abilities: [], name: 'abra', types: [] },
      winner: expect.stringMatching(/^pikachu|abra/g),
    });
  });
});
