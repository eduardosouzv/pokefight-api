require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const Sequelize = require('sequelize');
const config = require('../config/database');

const Battle = require('../models/Battle');

const connection = new Sequelize(config);

Battle.init(connection);

module.exports = connection;
