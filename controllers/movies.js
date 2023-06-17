const Movie = require('../models/movie');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../utils/errors');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('invalid data to create movie'));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const owner = req.user._id;

  Movie.findById(movieId)
    .orFail()
    .then((movie) => {
      if (movie.owner.toString() !== owner) {
        throw new ForbiddenError('not enough rights');
      }
      return Movie.deleteOne(movie)
        .then(() => {
          res.send({ message: 'movie removed' });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('invalid data to delete card'));
      } if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError(`${movieId} is not found`));
      }
      return next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
