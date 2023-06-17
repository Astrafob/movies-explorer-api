const { celebrate, Joi } = require('celebrate');

// eslint-disable-next-line no-useless-escape
const urlPattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
const idPattern = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

const validateDataForCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const validateDataforAuthorize = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const validateNewDataUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateDataCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(urlPattern),
    trailer: Joi.string().required().regex(urlPattern),
    thumbnail: Joi.string().required().regex(urlPattern),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateDataIdMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().regex(idPattern),
  }),
});

module.exports = {
  validateDataForCreateUser,
  validateDataforAuthorize,
  validateNewDataUser,
  validateDataCreateMovie,
  validateDataIdMovie,
};
