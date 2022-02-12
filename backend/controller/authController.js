const db = require('../index');
const Auth = db.auth;
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator/check');

const signUp = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const data = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        token: req.body.token
    };

    try{
        if(!(data.email && data.password && data.fullName)) throw new Error('Data not formatted properly');

        const user = new Auth(data);
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(user.password, salt);
        user.save();

        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const login = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    const data = {
        email: req.body.email,
        password: req.body.password
    };

    try{
        const user = await Auth.findOne({ email: data.email });

        if(user) {
            const validPassword = await bcrypt.compare(data.password, user.password);
            if(validPassword) res.status(200).send(user);
            else res.status(400).send('Invalid Password');
        }
        else res.status(401).send('User does not exist');

    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    signUp,
    login,
}