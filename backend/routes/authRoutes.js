const express = require('express');
const { check } = require('express-validator');
const {
    signUp,
    login
} = require('../controller/authController');

const router = express.Router();

router.post('/signup',
    check('password').isStrongPassword({
       minLength: 6,
       minSymbols: 1,
       minNumbers: 1,
       minUppercase: 0,
    }),
    signUp);
router.post('/login',
    check('password').isLength({ min: 6 }), login);

module.exports = router;