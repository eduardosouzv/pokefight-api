const redisConfig = require('../config/redis');

const Queue = require('bull');

const jobs = require('../jobs');

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, redisConfig),
  name: job.key,
  handle: job.handle,
}));

module.exports = {
  queues,
  add(name, data) {
    const [queue] = queues.filter(queue => queue.name === name);

    return queue.bull.add(data);
  },

  process() {
    return queues.forEach(queue => {
      queue.bull.process(queue.handle);

      queue.bull.on('failed', (job, err) => {
        console.log('Job failed: ', job.queue.name);
      });
    });
  },
};
