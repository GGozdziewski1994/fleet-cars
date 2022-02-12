module.exports = (sequelize, DataTypes) => {
    return sequelize.define('cars', {
        brand: {
            type: DataTypes.STRING
        },
        model: {
            type: DataTypes.STRING
        },
        year: {
            type: DataTypes.INTEGER
        },
        dateOfIntroduction: {
            type: DataTypes.DATE
        },
        mileage: {
            type: DataTypes.INTEGER
        },
        isEdit: {
            type: DataTypes.BOOLEAN
        }
    });
};