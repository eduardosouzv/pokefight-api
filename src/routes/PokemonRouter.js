const { Router } = require('express');

const PokemonController = require('../controllers/PokemonController');

const PokemonRouter = Router();

PokemonRouter.post('/create', PokemonController.create);
PokemonRouter.get('/show/:id', PokemonController.show);
PokemonRouter.get('/index', PokemonController.index);

module.exports = PokemonRouter;
