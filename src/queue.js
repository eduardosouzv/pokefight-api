require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const Queue = require('./lib/Queue');

require('./database');

Queue.process();
