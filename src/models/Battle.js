const { Model, DataTypes } = require('sequelize');

class Battle extends Model {
  static init(sequelize) {
    super.init(
      {
        defiant_name: DataTypes.STRING,
        opponent_name: DataTypes.STRING,
        winner: DataTypes.STRING,
        status: DataTypes.ENUM(['PENDING', 'FINISHED', 'ERROR']),
      },
      { sequelize }
    );
  }
}

module.exports = Battle;
