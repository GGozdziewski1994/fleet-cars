const dbConfig = require('./config/dbConfig');

const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
});

try{
    sequelize.authenticate()
    console.log('connected..');
} catch (error) {
    console.log('Error', error)
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.cars = require('./model/carModel')(sequelize, DataTypes);
db.auth = require('./model/authModel')(sequelize, DataTypes);

try{
    db.sequelize.sync({ force: false });
    console.log('yes re-sync done!');
} catch (error) {
    console.log('Error', error);
}

module.exports = db;