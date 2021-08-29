'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('battles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      defiant_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      opponent_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      winner: {
        type: Sequelize.STRING,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('battles');
  },
};
