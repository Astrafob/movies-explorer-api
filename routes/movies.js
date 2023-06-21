const router = require('express').Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const { validateDataCreateMovie, validateDataIdMovie } = require('../middlewares/validationRequest');

router.get('/', getMovies);
router.post('/', validateDataCreateMovie, createMovie);
router.delete('/:movieId', validateDataIdMovie, deleteMovie);

module.exports = router;
