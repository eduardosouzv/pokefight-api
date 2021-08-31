'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('battles', 'status', {
      type: Sequelize.ENUM(['PENDING', 'FINISHED', 'ERROR']),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('battles', 'status');
  },
};
