const router = require('express').Router();
const {
  getUser, updateUser,
} = require('../controllers/users');
const { validateNewDataUser } = require('../middlewares/validationRequest');

router.get('/me', getUser);
router.patch('/me', validateNewDataUser, updateUser);

module.exports = router;
