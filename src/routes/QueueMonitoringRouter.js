const { Router } = require('express');

const Queue = require('../lib/Queue');

const { createBullBoard } = require('bull-board');
const { BullAdapter } = require('bull-board/bullAdapter');

const { router } = createBullBoard(Queue.queues.map(queue => new BullAdapter(queue.bull)));

const QueueMonitoringRouter = Router();

QueueMonitoringRouter.use('/queues', router);

module.exports = QueueMonitoringRouter;
