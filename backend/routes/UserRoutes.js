const express = require('express');
const router = express();

const { register } = require('../controllers/UserController');

// midlewares
const validate = require('../middlewares/handleValidation');
const { userCreateValidation } = require('../middlewares/userValidations');

router.post('/register', userCreateValidation(), validate, register);


module.exports = router;