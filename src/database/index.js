const Sequelize = require('sequelize');
const config = require('../config/database');

const Battle = require('../models/Battle');

const connection = new Sequelize(config);

Battle.init(connection);

module.exports = connection;
