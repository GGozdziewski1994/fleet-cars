const dotenv = require('dotenv');
dotenv.config();

const {
    HOST,
    USER,
    PASSWORD,
    DB,
} = process.env;

module.exports = {
    HOST: HOST,
    USER: USER,
    PASSWORD: PASSWORD,
    DB: DB,
    dialect: "mysql",

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};