jest.mock('../../src/lib/Queue', () => {
  return {
    add: jest.fn().mockResolvedValue(),
  };
});
jest.mock('../../src/models/Battle');
jest.mock('../../src/clients/PokeApiClient', () => {
  return function () {
    return {
      getPokemonInformation: jest
        .fn()
        .mockResolvedValueOnce({
          name: 'aipom',
          abilities: [],
          types: [],
        })
        .mockResolvedValueOnce({
          name: 'gligar',
          abilities: [],
          types: [],
        }),
    };
  };
});

const Battle = require('../../src/models/Battle');
const PokeApiService = require('../../src/services/PokeApiService');

describe('PokeApi', () => {
  const pokeApiService = new PokeApiService();

  it('should return a battle with status pending', async () => {
    Battle.create.mockResolvedValueOnce({
      id: 1,
      defiant_name: 'aipom',
      opponent_name: 'gligar',
      status: 'PENDING',
      winner: null,
    });

    const createdBattle = await pokeApiService.createBattle({ defiant_name: 'pikachu', opponent_name: 'abra' });

    expect(createdBattle).toEqual({
      id: 1,
      defiant_name: 'aipom',
      opponent_name: 'gligar',
      status: 'PENDING',
      winner: null,
    });
  });

  it('should return a battle id 1', async () => {
    Battle.findByPk.mockResolvedValueOnce({ defiant_name: 'aipom', opponent_name: 'gligar', winner: 'gligar' });

    const createdBattle = await pokeApiService.findOneBattle(1);

    expect(createdBattle).toEqual({
      battle_id: 1,
      winner: 'gligar',
      defiant_info: {
        name: 'aipom',
        abilities: [],
        types: [],
      },
      opponent_info: {
        name: 'gligar',
        abilities: [],
        types: [],
      },
    });
  });

  it('should return empty when battle not exists', async () => {
    Battle.findByPk.mockResolvedValueOnce();

    const createdBattle = await pokeApiService.findOneBattle(1);

    expect(createdBattle).toBeUndefined();
  });

  it('should return array of all battles', async () => {
    Battle.findAll.mockResolvedValueOnce([
      {
        id: 1,
        defiant_name: 'pikachu',
        opponent_name: 'abra',
        winner: 'pikachu',
        status: 'FINISHED',
      },
      {
        id: 2,
        defiant_name: 'gligar',
        opponent_name: 'aipom',
        winner: 'aipom',
        status: 'FINISHED',
      },
    ]);

    const battles = await pokeApiService.findAll();

    expect(battles).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          defiant_name: 'pikachu',
          opponent_name: 'abra',
          winner: 'pikachu',
          status: 'FINISHED',
        },
        {
          id: 2,
          defiant_name: 'gligar',
          opponent_name: 'aipom',
          winner: 'aipom',
          status: 'FINISHED',
        },
      ])
    );
  });

  it('should return an empty array when not exists battles', async () => {
    Battle.findAll.mockResolvedValueOnce([]);

    const battles = await pokeApiService.findAll();

    expect(battles).toEqual([]);
  });

  it('should resolve a battle', async () => {
    const resolvedBattle = await pokeApiService.resolveBattle({
      id: 1,
      defiant_name: 'gligar',
      opponent_name: 'aipom',
    });

    expect(resolvedBattle).toEqual({
      id: 1,
      winner: expect.stringMatching(/^gligar|aipom/g),
      defiant_info: {
        name: 'aipom',
        abilities: [],
        types: [],
      },
      opponent_info: {
        name: 'gligar',
        abilities: [],
        types: [],
      },
    });
  });

  it('should update pending battle when an error occurred', async () => {
    Battle.update.mockResolvedValue();

    let spy = jest.spyOn(Battle, 'update');

    await pokeApiService.updateBattleIfOccurrateAnError(1);

    expect(spy).toBeCalledTimes(1);
  });
});
