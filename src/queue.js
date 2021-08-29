require('dotenv').config();

const Queue = require('./lib/Queue');

require('./database');

Queue.process();
