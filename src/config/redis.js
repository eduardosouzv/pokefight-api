require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

module.exports = { port: process.env.REDIS_PORT, host: process.env.REDIS_HOST };
