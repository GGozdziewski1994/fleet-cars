module.exports = (sequelize, DataTypes) => {
    return sequelize.define('auth', {
        fullName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        token: {
            type: DataTypes.STRING
        },
    });
};