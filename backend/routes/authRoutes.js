const express = require('express');
const db = require('../index');
const Auth = db.auth;
const { check } = require('express-validator');
const {
    signUp,
    login
} = require('../controller/authController');

const router = express.Router();

router.post('/signup', check('email').custom(value => {
        return Auth.findOne({
            email: value
        }).then(user => {
            if(user.length > 0) throw ('Email is taken!');
        })
    }),
    check('password').isStrongPassword({
       minLength: 6,
       minSymbols: 1,
       minNumbers: 1,
       minUppercase: 0,
    }),
    signUp);
router.post('/login', check('email').isEmail().normalizeEmail(),
    check('password').isLength({ min: 6 }), login);

module.exports = router;