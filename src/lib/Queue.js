const redisConfig = require('../config/redis');

const Queue = require('bull');

const jobs = require('../jobs');

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, {
    redis: redisConfig,
  }),
  name: job.key,
  handle: job.handle,
}));

module.exports = {
  queues,
  add(name, data) {
    const queue = queues.find(queue => queue.name === name);

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

  async close() {
    return Promise.all(
      queues.map(async queue => {
        await queue.bull.whenCurrentJobsFinished();
        return queue.bull.close();
      })
    );
  },

  waitCompletion(name) {
    const queue = queues.find(queue => queue.name === name);

    return new Promise(async resolve => {
      let count = 0;

      do {
        const [active, pendingAndDelayed] = await Promise.all([queue.bull.getActiveCount(), queue.bull.count()]);

        count = active + pendingAndDelayed;

        if (count === 0) {
          return resolve();
        }

        await new Promise(r => setTimeout(r, 100));
      } while (count > 0);
    });
  },
};
