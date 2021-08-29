const { Router } = require('express');

const PokemonRouter = require('./PokemonRouter');
const QueueMonitoringRouter = require('./QueueMonitoringRouter');

const router = Router();

router.use('/pokemon', PokemonRouter);
router.use('/admin', QueueMonitoringRouter);

module.exports = router;
