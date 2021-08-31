const { Router } = require('express');

const { celebrate, Joi, errors, Segments } = require('celebrate');

const PokemonController = require('../controllers/PokemonController');

const PokemonRouter = Router();

PokemonRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      defiant: Joi.string().required(),
      opponent: Joi.string().required(),
    }),
  }),
  PokemonController.create
);
PokemonRouter.get(
  '/show/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer(),
    }),
  }),
  PokemonController.show
);
PokemonRouter.get('/index', PokemonController.index);

module.exports = PokemonRouter;
