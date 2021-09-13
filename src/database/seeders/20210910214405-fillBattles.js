'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('battles', [
      {
        defiant_name: 'bulbasaur',
        opponent_name: 'squirtle',
        winner: 'squirtle',
        status: 'FINISHED',
      },
      {
        defiant_name: 'ivysaur',
        opponent_name: 'charmander',
        winner: 'ivysaur',
        status: 'FINISHED',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('battles', null, {});
  },
};
